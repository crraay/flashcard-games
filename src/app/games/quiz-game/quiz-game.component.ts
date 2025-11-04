import { Component, OnInit } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface QuizOption {
  caption: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  flashcard: Flashcard;
  options: QuizOption[];
}

@Component({
  selector: 'fg-quiz-game',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './quiz-game.component.html',
  styleUrl: './quiz-game.component.scss'
})
export class QuizGameComponent implements OnInit {
  selectedSet: FlashcardSet | null = null;
  questions: QuizQuestion[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedAnswer: string | null = null;
  showResult: boolean = false;
  isCorrect: boolean = false;
  quizComplete: boolean = false;
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
        this.initializeQuiz();
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  initializeQuiz(): void {
    if (!this.selectedSet) return;

    const flashcards = this.flashcardService.getFlashcardsBySetId(this.selectedSet.id);
    this.allFlashcards = this.flashcardService.getAllFlashcards();

    // Shuffle flashcards for random question order
    this.shuffleArray(flashcards);

    this.questions = flashcards.map(flashcard => {
      // Create 4 options: 1 correct + 3 incorrect
      const options: QuizOption[] = [
        { caption: flashcard.caption, isCorrect: true }
      ];

      // Get incorrect options from other flashcards
      const incorrectOptions = this.allFlashcards
        .filter(f => f.id !== flashcard.id)
        .map(f => f.caption);

      this.shuffleArray(incorrectOptions);

      // Add 3 incorrect options
      for (let i = 0; i < 3 && i < incorrectOptions.length; i++) {
        options.push({ caption: incorrectOptions[i], isCorrect: false });
      }

      // Shuffle the options so correct answer isn't always first
      this.shuffleArray(options);

      return {
        flashcard,
        options
      };
    });

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizComplete = false;
    this.showResult = false;
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectAnswer(option: QuizOption): void {
    if (this.showResult) return; // Prevent clicking after answer is revealed

    this.selectedAnswer = option.caption;
    this.isCorrect = option.isCorrect;
    this.showResult = true;

    if (option.isCorrect) {
      this.score++;
    }
  }

  nextQuestion(): void {
    this.selectedAnswer = null;
    this.showResult = false;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.quizComplete = true;
    }
  }

  restartQuiz(): void {
    this.initializeQuiz();
  }

  getCurrentQuestion(): QuizQuestion | null {
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
    // Extract gameId from route URL (e.g., '/games/quiz/:setId' -> 'quiz')
    const routeUrl = this.route.snapshot.url;
    if (routeUrl.length >= 2 && routeUrl[0].path === 'games') {
      const gameId = routeUrl[1].path;
      this.router.navigate(['/games', gameId, 'select']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
