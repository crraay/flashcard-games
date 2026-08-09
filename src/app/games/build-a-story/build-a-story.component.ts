import { Component, OnInit } from '@angular/core';
import { Sentence, Story } from '../../models';
import { StoryService } from '../../services/story.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface StoryQuestion {
  sentence: Sentence;
  correctWords: string[];
}

@Component({
  selector: 'fg-build-a-story',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './build-a-story.component.html',
  styleUrl: './build-a-story.component.scss'
})
export class BuildAStoryComponent implements OnInit {
  selectedStory: Story | null = null;
  questions: StoryQuestion[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  userAnswer: string[] = [];
  availableWords: string[] = [];
  gameComplete: boolean = false;
  showResult: boolean = false;
  isCorrect: boolean = false;
  gameId: string = '';
  completedSentences: string[] = [];

  constructor(
    private storyService: StoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storyId = this.route.snapshot.queryParams['story'];
    if (!storyId) {
      this.router.navigate(['/']);
      return;
    }

    const urlSegments = this.route.snapshot.url;
    this.gameId = urlSegments.length > 1 ? urlSegments[1].path : '';

    this.selectedStory = this.storyService.getStoryById(storyId) ?? null;
    if (!this.selectedStory) {
      this.router.navigate(['/']);
      return;
    }

    this.initializeGame();
  }

  initializeGame(): void {
    if (!this.selectedStory) {
      return;
    }

    const sentences = this.storyService.getSentencesByStoryId(this.selectedStory.id);
    this.questions = sentences.map(sentence => ({
      sentence,
      correctWords: this.splitIntoWords(sentence.text)
    }));

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.gameComplete = false;
    this.completedSentences = [];
    this.resetCurrentQuestion();
  }

  splitIntoWords(text: string): string[] {
    return text
      .trim()
      .split(/\s+/)
      .map(word => word.replace(/\.+$/, '').toUpperCase())
      .filter(word => word.length > 0);
  }

  resetCurrentQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length) {
      const question = this.questions[this.currentQuestionIndex];
      this.availableWords = this.shuffleWordsAvoidingOriginal(question.correctWords);
      this.userAnswer = [];
      this.showResult = false;
      this.isCorrect = false;
    }
  }

  shuffleWordsAvoidingOriginal(words: string[]): string[] {
    if (words.length <= 1 || new Set(words).size === 1) {
      return [...words];
    }

    const shuffled = [...words];
    do {
      this.shuffleArray(shuffled);
    } while (this.arraysEqual(shuffled, words));

    return shuffled;
  }

  arraysEqual(a: string[], b: string[]): boolean {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }

  shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  selectWord(word: string, index: number): void {
    if (this.showResult) {
      return;
    }

    this.availableWords.splice(index, 1);
    this.userAnswer.push(word);
  }

  removeWord(word: string, index: number): void {
    if (this.showResult) {
      return;
    }

    this.userAnswer.splice(index, 1);
    this.availableWords.push(word);
  }

  checkAnswer(): void {
    if (this.showResult) {
      return;
    }

    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.isCorrect = this.userAnswer.join(' ') === currentQuestion.correctWords.join(' ');
    this.showResult = true;

    if (this.isCorrect) {
      this.score++;
      this.completedSentences.push(currentQuestion.correctWords.join(' '));
    }
  }

  repeatQuestion(): void {
    this.resetCurrentQuestion();
  }

  nextQuestion(): void {
    if (this.showResult && !this.isCorrect) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.completedSentences.push(currentQuestion.correctWords.join(' '));
    }

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

  getCurrentQuestion(): StoryQuestion | null {
    if (this.currentQuestionIndex < this.questions.length) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  getScorePercentage(): number {
    if (this.questions.length === 0) {
      return 0;
    }
    return Math.round((this.score / this.questions.length) * 100);
  }

  getCompletionMessage(): string {
    const percentage = this.getScorePercentage();
    let message = `Your Score: ${this.score}/${this.questions.length} (${percentage}%)\n\n`;

    if (percentage === 100) {
      message += 'Perfect! You built the whole story! 🌟';
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
    const currentQuestion = this.questions[this.currentQuestionIndex];
    return currentQuestion != null && this.userAnswer.length === currentQuestion.correctWords.length;
  }

  getNextButtonLabel(): string {
    return this.currentQuestionIndex + 1 < this.questions.length ? 'Next Sentence' : 'Finish Story';
  }

  goBack(): void {
    if (this.gameId) {
      this.router.navigate(['/stories', this.gameId, 'select']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
