import { Component, OnInit } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface TrueFalseQuestion {
  flashcard: Flashcard;
  statement: string;
  isCorrect: boolean; // true if statement is correct, false if incorrect
}

@Component({
  selector: 'fg-true-false',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './true-false.component.html',
  styleUrl: './true-false.component.scss'
})
export class TrueFalseComponent implements OnInit {
  selectedSet: FlashcardSet | null = null;
  questions: TrueFalseQuestion[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedAnswer: boolean | null = null;
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
      // Generate a statement - either correct or incorrect
      const isCorrect = Math.random() > 0.5;
      let statement: string;

      if (isCorrect) {
        // Correct statement - use the actual caption
        statement = `This is a ${flashcard.caption}.`;
      } else {
        // Incorrect statement - use a different word from the set
        const otherFlashcards = this.allFlashcards.filter(f => f.id !== flashcard.id);
        if (otherFlashcards.length > 0) {
          const randomOther = otherFlashcards[Math.floor(Math.random() * otherFlashcards.length)];
          statement = `This is a ${randomOther.caption}.`;
        } else {
          // Fallback if no other flashcards
          statement = `This is not a ${flashcard.caption}.`;
        }
      }

      return {
        flashcard,
        statement,
        isCorrect
      };
    });

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.gameComplete = false;
    this.resetCurrentQuestion();
  }

  resetCurrentQuestion(): void {
    this.selectedAnswer = null;
    this.showResult = false;
    this.isCorrect = false;
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectAnswer(answer: boolean): void {
    if (this.showResult) return;

    this.selectedAnswer = answer;
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.isCorrect = answer === currentQuestion.isCorrect;
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

  getCurrentQuestion(): TrueFalseQuestion | null {
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

  goBack(): void {
    const routeUrl = this.route.snapshot.url;
    if (routeUrl.length >= 2 && routeUrl[0].path === 'games') {
      const gameId = routeUrl[1].path;
      this.router.navigate(['/games', gameId, 'select']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
