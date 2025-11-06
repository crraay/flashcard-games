import { Component, OnInit } from '@angular/core';
import { FlashcardSet, Flashcard } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface BlankOption {
  position: number; // position in the word
  correctLetter: string;
  options: string[]; // correct letter + incorrect letters
}

interface FillBlankQuestion {
  flashcard: Flashcard;
  correctAnswer: string;
  blankPattern: string; // e.g., "C_T" for "CAT"
  blankIndices: number[]; // indices of missing letters
  blankOptions: BlankOption[]; // letter options for each blank
}

@Component({
  selector: 'fg-fill-blank',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './fill-blank.component.html',
  styleUrl: './fill-blank.component.scss'
})
export class FillBlankComponent implements OnInit {
  selectedSet: FlashcardSet | null = null;
  questions: FillBlankQuestion[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  userAnswer: string[] = []; // Array to store selected letters for each blank
  availableLetters: { [position: number]: string[] } = {}; // Available letters for each blank position
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

      // Generate letter options for each blank
      const blankOptions: BlankOption[] = blankIndices.map(position => {
        const correctLetter = letters[position];
        const incorrectLetters = this.generateIncorrectLetters(correctLetter, 3); // 3 incorrect options
        const allOptions = [correctLetter, ...incorrectLetters];
        this.shuffleArray(allOptions); // Shuffle so correct letter isn't always first

        return {
          position,
          correctLetter,
          options: allOptions
        };
      });

      return {
        flashcard,
        correctAnswer: word,
        blankPattern,
        blankIndices,
        blankOptions
      };
    });

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.gameComplete = false;
    this.resetCurrentQuestion();
  }

  resetCurrentQuestion(): void {
    const question = this.getCurrentQuestion();
    if (question) {
      // Initialize user answer array with empty strings for each blank
      this.userAnswer = new Array(question.blankIndices.length).fill('');
      // Initialize available letters for each blank position
      this.availableLetters = {};
      question.blankOptions.forEach((option, index) => {
        this.availableLetters[option.position] = [...option.options];
      });
    }
    this.showResult = false;
    this.isCorrect = false;
  }

  generateIncorrectLetters(correctLetter: string, count: number): string[] {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const incorrect: string[] = [];
    const used = new Set([correctLetter]);

    while (incorrect.length < count) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!used.has(randomLetter)) {
        incorrect.push(randomLetter);
        used.add(randomLetter);
      }
    }

    return incorrect;
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectLetter(letter: string, position: number, optionIndex: number): void {
    if (this.showResult) return;

    const question = this.getCurrentQuestion();
    if (!question) return;

    // Find the index in blankIndices for this position
    const blankIndex = question.blankIndices.indexOf(position);
    if (blankIndex === -1) return;

    // Set the selected letter for this blank (allow replacing)
    this.userAnswer[blankIndex] = letter;

    // Auto-check if all blanks are filled and all are correct
    this.checkIfAllCorrect();
  }

  checkIfAllCorrect(): void {
    const question = this.getCurrentQuestion();
    if (!question) return;

    // Check if all blanks are filled
    if (this.userAnswer.some(letter => !letter)) {
      return; // Not all blanks filled yet
    }

    // Check if all selected letters are correct
    const allCorrect = question.blankIndices.every((position, index) => {
      const selectedLetter = this.userAnswer[index];
      const correctLetter = question.blankOptions.find(opt => opt.position === position)?.correctLetter;
      return selectedLetter === correctLetter;
    });

    if (allCorrect) {
      // All blanks are filled correctly, automatically show result
      this.isCorrect = true;
      this.showResult = true;
      this.score++;
      this.checkGameCompletion();
    }
  }


  checkGameCompletion(): void {
    // Check if game is completed (all questions answered)
    if (this.score === this.questions.length && this.questions.length > 0) {
      // Game will be marked complete when moving to next question
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


  getSelectedLetterForPosition(position: number): string {
    const question = this.getCurrentQuestion();
    if (!question) return '';
    const blankIndex = question.blankIndices.indexOf(position);
    return blankIndex !== -1 ? this.userAnswer[blankIndex] : '';
  }

  isPositionFilled(position: number): boolean {
    return this.getSelectedLetterForPosition(position).length > 0;
  }

  isLetterCorrect(position: number): boolean {
    const question = this.getCurrentQuestion();
    if (!question) return false;
    const selectedLetter = this.getSelectedLetterForPosition(position);
    if (!selectedLetter) return false;
    const correctLetter = question.blankOptions.find(opt => opt.position === position)?.correctLetter;
    return selectedLetter === correctLetter;
  }

  isLetterIncorrect(position: number): boolean {
    const question = this.getCurrentQuestion();
    if (!question) return false;
    const selectedLetter = this.getSelectedLetterForPosition(position);
    if (!selectedLetter) return false;
    const correctLetter = question.blankOptions.find(opt => opt.position === position)?.correctLetter;
    return selectedLetter !== correctLetter;
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
