import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Connection {
  flashcardId: string;
  captionId: string;
  isCorrect: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'fg-matching-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.scss'
})
export class MatchingGameComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedSet: FlashcardSet | null = null;
  @ViewChild('gameContainer', { static: false }) gameContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('svgOverlay', { static: false }) svgOverlay!: ElementRef<SVGElement>;

  flashcards: Flashcard[] = [];
  shuffledCaptions: Flashcard[] = [];
  selectedImageId: string | null = null;
  selectedCaptionId: string | null = null;
  connections: Connection[] = [];
  tempLineEnd: { x: number; y: number } | null = null;
  private mouseMoveHandler: ((event: MouseEvent) => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  constructor(
    private flashcardService: FlashcardService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const setId = this.route.snapshot.params['setId'];
    if (setId) {
      const allSets = this.flashcardService.getAllSets();
      this.selectedSet = allSets.find(s => s.id === setId) || null;

      if (this.selectedSet) {
        this.flashcards = this.flashcardService.getFlashcardsBySetId(this.selectedSet.id);
        this.shuffledCaptions = this.shuffleArray([...this.flashcards]);
      } else {
        // Invalid set ID, redirect to game selector
        this.router.navigate(['/']);
      }
    } else {
      // No set ID in route, redirect to game selector
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    if (this.gameContainer) {
      this.mouseMoveHandler = (event: MouseEvent) => {
        this.onMouseMove(event);
        this.cdr.detectChanges();
      };
      this.gameContainer.nativeElement.addEventListener('mousemove', this.mouseMoveHandler);

      this.resizeHandler = () => {
        this.updateSvgSize();
        this.recalculateConnections();
      };
      window.addEventListener('resize', this.resizeHandler);

      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        this.updateSvgSize();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (this.gameContainer && this.mouseMoveHandler) {
      this.gameContainer.nativeElement.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  private updateSvgSize(): void {
    if (this.svgOverlay && this.gameContainer) {
      const container = this.gameContainer.nativeElement;
      const svg = this.svgOverlay.nativeElement;
      const width = container.offsetWidth || container.clientWidth;
      const height = container.offsetHeight || container.clientHeight;
      svg.setAttribute('width', width.toString());
      svg.setAttribute('height', height.toString());
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
  }

  private recalculateConnections(): void {
    // Recalculate all connection coordinates
    const recalculatedConnections: Connection[] = [];
    this.connections.forEach(conn => {
      const imageElement = document.getElementById(`image-${conn.flashcardId}`);
      const captionElement = document.getElementById(`caption-${conn.captionId}`);

      if (imageElement && captionElement) {
        const containerRect = this.gameContainer.nativeElement.getBoundingClientRect();
        const imageRect = imageElement.getBoundingClientRect();
        const captionRect = captionElement.getBoundingClientRect();

        recalculatedConnections.push({
          flashcardId: conn.flashcardId,
          captionId: conn.captionId,
          isCorrect: conn.isCorrect,
          x1: imageRect.left + imageRect.width / 2 - containerRect.left,
          y1: imageRect.top + imageRect.height / 2 - containerRect.top,
          x2: captionRect.left + captionRect.width / 2 - containerRect.left,
          y2: captionRect.top + captionRect.height / 2 - containerRect.top
        });
      }
    });
    this.connections = recalculatedConnections;
    this.cdr.detectChanges();
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.selectedImageId && !this.selectedCaptionId) {
      const rect = this.gameContainer.nativeElement.getBoundingClientRect();
      this.tempLineEnd = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }

  onImageClick(flashcard: Flashcard): void {
    // If clicking on an already connected image, remove the connection
    const existingConnection = this.connections.find(c => c.flashcardId === flashcard.id);
    if (existingConnection) {
      this.removeConnection(flashcard.id);
      this.selectedImageId = null;
      this.selectedCaptionId = null;
      this.tempLineEnd = null;
      return;
    }

    if (this.selectedImageId === flashcard.id) {
      // Deselect if clicking the same image
      this.selectedImageId = null;
      this.tempLineEnd = null;
    } else {
      this.selectedImageId = flashcard.id;
      this.selectedCaptionId = null;
      // Reset temp line end to center of selected image
      const element = document.getElementById(`image-${flashcard.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const containerRect = this.gameContainer.nativeElement.getBoundingClientRect();
        this.tempLineEnd = {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top
        };
      }
    }
  }

  onCaptionClick(flashcard: Flashcard): void {
    if (!this.selectedImageId) {
      return;
    }

    // Create connection
    this.selectedCaptionId = flashcard.id;
    this.createConnection(this.selectedImageId, flashcard.id);
    this.selectedImageId = null;
    this.selectedCaptionId = null;
    this.tempLineEnd = null;
  }

  createConnection(flashcardId: string, captionId: string): void {
    // Remove any existing connection for this image or caption
    this.removeConnection(flashcardId);
    this.connections = this.connections.filter(c => c.captionId !== captionId);

    const imageElement = document.getElementById(`image-${flashcardId}`);
    const captionElement = document.getElementById(`caption-${captionId}`);

    if (imageElement && captionElement) {
      const containerRect = this.gameContainer.nativeElement.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();
      const captionRect = captionElement.getBoundingClientRect();

      // A match is correct if the flashcard ID matches the caption ID (same flashcard)
      const isCorrect = flashcardId === captionId;

      const connection: Connection = {
        flashcardId,
        captionId,
        isCorrect,
        x1: imageRect.left + imageRect.width / 2 - containerRect.left,
        y1: imageRect.top + imageRect.height / 2 - containerRect.top,
        x2: captionRect.left + captionRect.width / 2 - containerRect.left,
        y2: captionRect.top + captionRect.height / 2 - containerRect.top
      };

      this.connections.push(connection);
    }
  }

  removeConnection(flashcardId: string): void {
    this.connections = this.connections.filter(c => c.flashcardId !== flashcardId);
  }

  getLineCoordinates(flashcardId: string): { x1: number; y1: number; x2: number; y2: number } | null {
    if (this.selectedImageId === flashcardId && this.tempLineEnd) {
      const imageElement = document.getElementById(`image-${flashcardId}`);
      if (imageElement) {
        const containerRect = this.gameContainer.nativeElement.getBoundingClientRect();
        const imageRect = imageElement.getBoundingClientRect();
        return {
          x1: imageRect.left + imageRect.width / 2 - containerRect.left,
          y1: imageRect.top + imageRect.height / 2 - containerRect.top,
          x2: this.tempLineEnd.x,
          y2: this.tempLineEnd.y
        };
      }
    }
    return null;
  }

  isImageSelected(flashcardId: string): boolean {
    return this.selectedImageId === flashcardId;
  }

  isCaptionSelected(captionId: string): boolean {
    return this.selectedCaptionId === captionId;
  }

  isImageConnected(flashcardId: string): boolean {
    return this.connections.some(c => c.flashcardId === flashcardId);
  }

  isCaptionConnected(captionId: string): boolean {
    return this.connections.some(c => c.captionId === captionId);
  }

  isImageIncorrect(flashcardId: string): boolean {
    const connection = this.connections.find(c => c.flashcardId === flashcardId);
    return connection ? !connection.isCorrect : false;
  }

  isCaptionIncorrect(captionId: string): boolean {
    const connection = this.connections.find(c => c.captionId === captionId);
    return connection ? !connection.isCorrect : false;
  }

  goBack(): void {
    const gameId = this.route.snapshot.params['gameId'];
    if (gameId) {
      this.router.navigate(['/games', gameId, 'select']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
