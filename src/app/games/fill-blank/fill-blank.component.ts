import { Component, OnInit } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface FillBlankQuestion {
  flashcard: Flashcard;
  correctAnswer: string;
  blankPattern: string; // e.g., "C_T" for "CAT"
  blankIndices: number[]; // indices of missing letters
}

@Component({
  selector: 'fg-fill-blank',
  standalone: true,
  imports: [CommonModule, FormsModule, GameCompletionComponent],
  templateUrl: './fill-blank.component.html',
  styleUrl: './fill-blank.component.scss'
})
export class FillBlankComponent implements OnInit {
  selectedSet: FlashcardSet | null = null;
  questions: FillBlankQuestion[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  userAnswer: string = '';
  gameComplete: boolean = false;
  showResult: boolean = false;
  isCorrect: boolean = false;
  allFlashcards: Flashcard[] = [];

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
        this.initializeGame();
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  initializeGame(): void {
    if (!this.selectedSet) return;

    const flashcards = this.flashcardService.getFlashcardsBySetId(this.selectedSet.id);
    this.allFlashcards = this.flashcardService.getAllFlashcards();

    // Shuffle flashcards for random order
    this.shuffleArray(flashcards);

    this.questions = flashcards.map(flashcard => {
      const word = flashcard.caption.toUpperCase();
      const letters = word.split('');

      // Determine how many letters to hide (30-50% of the word)
      const hideCount = Math.max(1, Math.floor(letters.length * (0.3 + Math.random() * 0.2)));

      // Create array of indices and shuffle to randomly select which letters to hide
      const indices = Array.from({ length: letters.length }, (_, i) => i);
      this.shuffleArray(indices);

      // Select random indices to hide
      const blankIndices = indices.slice(0, hideCount).sort((a, b) => a - b);

      // Create blank pattern
      const blankPattern = letters.map((letter, index) =>
        blankIndices.includes(index) ? '_' : letter
      ).join('');

      return {
        flashcard,
        correctAnswer: word,
        blankPattern,
        blankIndices
      };
    });

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.gameComplete = false;
    this.resetCurrentQuestion();
  }

  resetCurrentQuestion(): void {
    this.userAnswer = '';
    this.showResult = false;
    this.isCorrect = false;
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  checkAnswer(): void {
    if (this.showResult) return;

    const currentQuestion = this.questions[this.currentQuestionIndex];
    const userAnswerUpper = this.userAnswer.toUpperCase().trim();

    this.isCorrect = userAnswerUpper === currentQuestion.correctAnswer;
    this.showResult = true;

    if (this.isCorrect) {
      this.score++;
    }
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.gameComplete = true;
    } else {
      this.resetCurrentQuestion();
    }
  }

  restartGame(): void {
    this.initializeGame();
  }

  getCurrentQuestion(): FillBlankQuestion | null {
    if (this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  getScorePercentage(): number {
    if (this.questions.length === 0) return 0;
    return Math.round((this.score / this.questions.length) * 100);
  }

  getCompletionMessage(): string {
    const percentage = this.getScorePercentage();
    let message = `Your Score: ${this.score}/${this.questions.length} (${percentage}%)\n\n`;

    if (percentage === 100) {
      message += 'Perfect! 🌟';
    } else if (percentage >= 80) {
      message += 'Great job! 👍';
    } else if (percentage >= 60) {
      message += 'Good try! 💪';
    } else {
      message += 'Keep practicing! 📚';
    }

    return message;
  }

  canCheckAnswer(): boolean {
    return this.userAnswer.trim().length > 0;
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
