import { Component, OnInit } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface Connection {
  flashcardId: string;
  captionId: string;
  isCorrect: boolean;
}

@Component({
  selector: 'fg-matching-game',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.scss'
})
export class MatchingGameComponent implements OnInit {
  selectedSet: FlashcardSet | null = null;

  flashcards: Flashcard[] = [];
  shuffledCaptions: Flashcard[] = [];
  selectedImageId: string | null = null;
  selectedCaptionId: string | null = null;
  connections: Connection[] = [];
  gameCompleted: boolean = false;
  correctMatches: number = 0;
  totalMoves: number = 0;

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const setId = this.route.snapshot.params['setId'];
    if (setId) {
      const allSets = this.flashcardService.getAllSets();
      this.selectedSet = allSets.find(s => s.id === setId) || null;

      if (this.selectedSet) {
        const flashcardsFromSet = this.flashcardService.getFlashcardsBySetId(this.selectedSet.id);
        this.flashcards = this.shuffleArray([...flashcardsFromSet]);
        this.shuffledCaptions = this.shuffleArray([...flashcardsFromSet]);
      } else {
        // Invalid set ID, redirect to game selector
        this.router.navigate(['/']);
      }
    } else {
      // No set ID in route, redirect to game selector
      this.router.navigate(['/']);
    }
  }


  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }


  onImageClick(flashcard: Flashcard): void {
    // Don't allow interaction with correctly matched images
    if (this.isImageMatched(flashcard.id)) {
      return;
    }

    // If a caption is already selected, create connection
    if (this.selectedCaptionId && !this.selectedImageId) {
      this.selectedImageId = flashcard.id;
      this.createConnection(flashcard.id, this.selectedCaptionId);
      this.selectedImageId = null;
      this.selectedCaptionId = null;
      return;
    }

    if (this.selectedImageId === flashcard.id) {
      // Deselect if clicking the same image
      this.selectedImageId = null;
    } else {
      this.selectedImageId = flashcard.id;
      this.selectedCaptionId = null;
    }
  }

  onCaptionClick(flashcard: Flashcard): void {
    // Don't allow interaction with correctly matched captions
    if (this.isCaptionMatched(flashcard.id)) {
      return;
    }

    // If an image is already selected, create connection
    if (this.selectedImageId && !this.selectedCaptionId) {
      this.selectedCaptionId = flashcard.id;
      this.createConnection(this.selectedImageId, flashcard.id);
      this.selectedImageId = null;
      this.selectedCaptionId = null;
      return;
    }

    // If clicking the same caption, deselect it
    if (this.selectedCaptionId === flashcard.id) {
      this.selectedCaptionId = null;
    } else {
      // Select caption first (word first, then image)
      this.selectedCaptionId = flashcard.id;
      this.selectedImageId = null;
    }
  }

  createConnection(flashcardId: string, captionId: string): void {
    // Remove any existing connection for this image or caption
    this.removeConnection(flashcardId);
    this.connections = this.connections.filter(c => c.captionId !== captionId);

    // A match is correct if the flashcard ID matches the caption ID (same flashcard)
    const isCorrect = flashcardId === captionId;

    const connection: Connection = {
      flashcardId,
      captionId,
      isCorrect
    };

    this.connections.push(connection);
    this.totalMoves++;

    // If incorrect, remove the connection after a short delay
    if (!isCorrect) {
      setTimeout(() => {
        this.removeConnection(flashcardId);
      }, 1000);
    }

    // Check if game is completed (all flashcards have correct connections)
    this.checkGameCompletion();
  }

  checkGameCompletion(): void {
    // Count correct connections
    this.correctMatches = this.connections.filter(c => c.isCorrect).length;

    // Game is complete when all flashcards have correct connections
    if (this.correctMatches === this.flashcards.length && this.flashcards.length > 0) {
      this.gameCompleted = true;
    }
  }

  restartGame(): void {
    this.connections = [];
    this.selectedImageId = null;
    this.selectedCaptionId = null;
    this.gameCompleted = false;
    this.correctMatches = 0;
    this.totalMoves = 0;
    // Reshuffle both images and captions
    const allFlashcards = this.flashcardService.getFlashcardsBySetId(this.selectedSet!.id);
    this.flashcards = this.shuffleArray([...allFlashcards]);
    this.shuffledCaptions = this.shuffleArray([...allFlashcards]);
  }

  removeConnection(flashcardId: string): void {
    this.connections = this.connections.filter(c => c.flashcardId !== flashcardId);
    // Recheck completion status after removing a connection
    this.checkGameCompletion();
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

  isImageMatched(flashcardId: string): boolean {
    const connection = this.connections.find(c => c.flashcardId === flashcardId);
    return connection ? connection.isCorrect : false;
  }

  isCaptionMatched(captionId: string): boolean {
    const connection = this.connections.find(c => c.captionId === captionId);
    return connection ? connection.isCorrect : false;
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
    // Navigate back to game selection for the current set
    const setId = this.route.snapshot.params['setId'];
    if (setId) {
      this.router.navigate(['/sets', setId, 'select']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
