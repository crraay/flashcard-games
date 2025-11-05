import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface MemoryCard {
  id: string;
  type: 'image' | 'caption';
  content: string; // imageUrl for image type, caption text for caption type
  flashcardId: string; // to match image with caption
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'fg-memory-game',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './memory-game.component.html',
  styleUrl: './memory-game.component.scss'
})
export class MemoryGameComponent implements OnInit {
  selectedSet: FlashcardSet | null = null;
  cards: MemoryCard[] = [];
  flippedCards: MemoryCard[] = [];
  moves: number = 0;
  pairsMatched: number = 0;
  isChecking: boolean = false;
  gameWon: boolean = false;
  gridColumns: number = 4; // Default columns

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const setId = this.route.snapshot.params['setId'];
    if (setId) {
      const allSets = this.flashcardService.getAllSets();
      this.selectedSet = allSets.find(s => s.id === setId) || null;

      if (this.selectedSet) {
        this.initializeGame();
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  calculateGridColumns(totalCards: number): number {
    // For small numbers, use simple logic
    if (totalCards <= 4) return 2;
    if (totalCards <= 6) return 3;
    if (totalCards <= 8) return 4;
    if (totalCards <= 12) return 4;
    if (totalCards <= 16) return 4;
    if (totalCards <= 20) return 5;

    // For larger sets, find a factor close to sqrt
    const sqrt = Math.sqrt(totalCards);
    const cols = Math.ceil(sqrt);

    // Prefer even numbers for better visual balance
    return cols % 2 === 0 ? cols : cols + 1;
  }

  initializeGame(): void {
    if (!this.selectedSet) return;

    const flashcards = this.flashcardService.getFlashcardsBySetId(this.selectedSet.id);
    this.cards = [];

    // Create pairs: one image card and one caption card for each flashcard
    flashcards.forEach(flashcard => {
      // Image card
      this.cards.push({
        id: `image-${flashcard.id}`,
        type: 'image',
        content: flashcard.imageUrl,
        flashcardId: flashcard.id,
        isFlipped: false,
        isMatched: false
      });

      // Caption card
      this.cards.push({
        id: `caption-${flashcard.id}`,
        type: 'caption',
        content: flashcard.caption,
        flashcardId: flashcard.id,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards
    this.shuffleArray(this.cards);

    // Calculate optimal grid columns based on total cards
    this.gridColumns = this.calculateGridColumns(this.cards.length);

    this.moves = 0;
    this.pairsMatched = 0;
    this.gameWon = false;
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  flipCard(card: MemoryCard): void {
    // Don't allow flipping if already matched, already flipped, or checking
    if (card.isMatched || card.isFlipped || this.isChecking) {
      return;
    }

    // Don't allow flipping more than 2 cards
    if (this.flippedCards.length >= 2) {
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);

    // Check for match when 2 cards are flipped
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
  }

  checkMatch(): void {
    this.isChecking = true;
    const [card1, card2] = this.flippedCards;

    // Match if same flashcardId but different types (one image, one caption)
    const isMatch = card1.flashcardId === card2.flashcardId && card1.type !== card2.type;

    setTimeout(() => {
      if (isMatch) {
        // Mark both cards as matched
        card1.isMatched = true;
        card2.isMatched = true;
        this.pairsMatched++;

        // Check if game is won
        if (this.pairsMatched === this.cards.length / 2) {
          this.gameWon = true;
        }
      } else {
        // Flip cards back
        card1.isFlipped = false;
        card2.isFlipped = false;
      }

      this.flippedCards = [];
      this.isChecking = false;
      this.cdr.detectChanges();
    }, 1000); // Wait 1 second before flipping back or marking as matched
  }

  restartGame(): void {
    this.initializeGame();
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
