import { Component, OnInit } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface WordChoiceQuestion {
  word: string; // The caption to match
  correctFlashcard: Flashcard; // The correct flashcard
  wrongFlashcard: Flashcard; // The incorrect flashcard option
  flashcards: Flashcard[]; // The two flashcards in display order
}

@Component({
  selector: 'fg-word-choice',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './word-choice.component.html',
  styleUrl: './word-choice.component.scss'
})
export class WordChoiceComponent implements OnInit {
  selectedSet: FlashcardSet | null = null;
  questions: WordChoiceQuestion[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedFlashcardId: string | null = null;
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
      // Find a wrong flashcard option (different from the correct one)
      const otherFlashcards = this.allFlashcards.filter(f => f.id !== flashcard.id);
      let wrongFlashcard: Flashcard;
      
      if (otherFlashcards.length > 0) {
        wrongFlashcard = otherFlashcards[Math.floor(Math.random() * otherFlashcards.length)];
      } else {
        // Fallback if no other flashcards (shouldn't happen, but just in case)
        wrongFlashcard = flashcard;
      }

      // Randomly decide which position the correct answer should be in
      const correctIsFirst = Math.random() > 0.5;
      const flashcards = correctIsFirst 
        ? [flashcard, wrongFlashcard]
        : [wrongFlashcard, flashcard];

      return {
        word: flashcard.caption,
        correctFlashcard: flashcard,
        wrongFlashcard: wrongFlashcard,
        flashcards: flashcards
      };
    });

    // Shuffle the questions array
    this.shuffleArray(this.questions);

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.gameComplete = false;
    this.resetCurrentQuestion();
  }

  resetCurrentQuestion(): void {
    this.selectedFlashcardId = null;
    this.showResult = false;
    this.isCorrect = false;
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getCurrentQuestion(): WordChoiceQuestion | null {
    if (this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  getFlashcards(): Flashcard[] {
    const question = this.getCurrentQuestion();
    if (!question) return [];
    return question.flashcards;
  }

  selectFlashcard(flashcardId: string): void {
    if (this.showResult) return;

    this.selectedFlashcardId = flashcardId;
    const currentQuestion = this.getCurrentQuestion();
    
    if (currentQuestion) {
      this.isCorrect = flashcardId === currentQuestion.correctFlashcard.id;
      this.showResult = true;

      if (this.isCorrect) {
        this.score++;
      }
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

  isSelected(flashcardId: string): boolean {
    return this.selectedFlashcardId === flashcardId;
  }

  isCorrectAnswer(flashcardId: string): boolean {
    const currentQuestion = this.getCurrentQuestion();
    return currentQuestion ? flashcardId === currentQuestion.correctFlashcard.id : false;
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
