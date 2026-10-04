import { Component, OnDestroy, OnInit } from '@angular/core';
import { SightWordSet } from '../../models';
import { SightWordService } from '../../services/sight-word.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCompletionComponent } from '../../components/game-completion/game-completion.component';

interface SentenceWord {
  display: string;
  normalized: string;
  isSightWord: boolean;
  selected: boolean;
}

interface SentenceState {
  words: SentenceWord[];
}

@Component({
  selector: 'fg-sight-words',
  standalone: true,
  imports: [CommonModule, GameCompletionComponent],
  templateUrl: './sight-words.component.html',
  styleUrl: './sight-words.component.scss'
})
export class SightWordsComponent implements OnInit, OnDestroy {
  selectedSet: SightWordSet | null = null;
  sentences: SentenceState[] = [];
  currentSentenceIndex: number = 0;
  gameComplete: boolean = false;
  gameId: string = '';
  missWordIndex: number | null = null;
  private missTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private sightWordService: SightWordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const setId = this.route.snapshot.queryParams['set'];
    if (!setId) {
      this.router.navigate(['/']);
      return;
    }

    const urlSegments = this.route.snapshot.url;
    this.gameId = urlSegments.length > 1 ? urlSegments[1].path : '';

    this.selectedSet = this.sightWordService.getSetById(setId) ?? null;
    if (!this.selectedSet) {
      this.router.navigate(['/']);
      return;
    }

    this.initializeGame();
  }

  ngOnDestroy(): void {
    this.clearMiss();
  }

  initializeGame(): void {
    if (!this.selectedSet) {
      return;
    }

    const sightWordLookup = new Set(
      this.selectedSet.sightWords.map(word => this.normalizeWord(word))
    );

    this.sentences = this.selectedSet.sentences.map(sentence => ({
      words: this.splitIntoWords(sentence).map(display => {
        const normalized = this.normalizeWord(display);
        return {
          display,
          normalized,
          isSightWord: normalized.length > 0 && sightWordLookup.has(normalized),
          selected: false
        };
      })
    }));

    this.currentSentenceIndex = 0;
    this.gameComplete = false;
    this.clearMiss();
  }

  splitIntoWords(text: string): string[] {
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  normalizeWord(token: string): string {
    return token.toLowerCase().replace(/[^a-z0-9']/g, '');
  }

  getCurrentSentence(): SentenceState | null {
    if (this.currentSentenceIndex < this.sentences.length) {
      return this.sentences[this.currentSentenceIndex];
    }
    return null;
  }

  getCompletedSentences(): SentenceState[] {
    return this.sentences.slice(0, this.currentSentenceIndex);
  }

  onWordClick(word: SentenceWord, index: number): void {
    if (this.gameComplete || word.selected) {
      return;
    }

    if (word.isSightWord) {
      word.selected = true;
      this.clearMiss();
      return;
    }

    this.showMiss(index);
  }

  allSightWordsFound(): boolean {
    const sentence = this.getCurrentSentence();
    if (!sentence) {
      return false;
    }

    return sentence.words
      .filter(word => word.isSightWord)
      .every(word => word.selected);
  }

  nextSentence(): void {
    if (!this.allSightWordsFound()) {
      return;
    }

    this.clearMiss();

    if (this.currentSentenceIndex + 1 >= this.sentences.length) {
      this.gameComplete = true;
    } else {
      this.currentSentenceIndex++;
    }
  }

  restartGame(): void {
    this.initializeGame();
  }

  getNextButtonLabel(): string {
    return this.currentSentenceIndex + 1 < this.sentences.length ? 'Next Sentence' : 'Finish';
  }

  getCompletionMessage(): string {
    return 'You found all the sight words!';
  }

  goBack(): void {
    if (this.gameId) {
      this.router.navigate(['/sight-word-sets', this.gameId, 'select']);
    } else {
      this.router.navigate(['/']);
    }
  }

  private showMiss(index: number): void {
    this.clearMiss();
    this.missWordIndex = index;
    this.missTimeoutId = setTimeout(() => {
      this.missWordIndex = null;
      this.missTimeoutId = null;
    }, 600);
  }

  private clearMiss(): void {
    if (this.missTimeoutId !== null) {
      clearTimeout(this.missTimeoutId);
      this.missTimeoutId = null;
    }
    this.missWordIndex = null;
  }
}
