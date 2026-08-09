import { Routes } from '@angular/router';
import { GameSelectorComponent } from './components/game-selector/game-selector.component';
import { FlashcardSetSelectorComponent } from './components/flashcard-set-selector/flashcard-set-selector.component';
import { PrizesListComponent } from './components/prizes-list/prizes-list.component';
import { FlashcardListComponent } from './components/flashcard-list/flashcard-list.component';
import { MatchingGameComponent } from './games/matching-game/matching-game.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { QuizGameComponent } from './games/quiz-game/quiz-game.component';
import { WordScrambleComponent } from './games/word-scramble/word-scramble.component';
import { FillBlankComponent } from './games/fill-blank/fill-blank.component';
import { TrueFalseComponent } from './games/true-false/true-false.component';
import { WordSearchComponent } from './games/word-search/word-search.component';
import { WordChoiceComponent } from './games/word-choice/word-choice.component';
import { WhatsMissingComponent } from './games/whats-missing/whats-missing.component';
import { SlideshowComponent } from './games/slideshow/slideshow.component';
import { BucketSortingComponent } from './games/bucket-sorting/bucket-sorting.component';
import { WheelOfFortuneComponent } from './games/wheel-of-fortune/wheel-of-fortune.component';
import { StorySelectorComponent } from './components/story-selector/story-selector.component';
import { BuildAStoryComponent } from './games/build-a-story/build-a-story.component';

export const routes: Routes = [
  {
    path: '',
    component: GameSelectorComponent
  },
  {
    path: 'prizes',
    component: PrizesListComponent
  },
  {
    path: 'flashcards',
    component: FlashcardListComponent
  },
  {
    path: 'sets/:gameId/select',
    component: FlashcardSetSelectorComponent
  },
  {
    path: 'stories/:gameId/select',
    component: StorySelectorComponent
  },
  {
    path: 'games/matching',
    component: MatchingGameComponent
  },
  {
    path: 'games/memory',
    component: MemoryGameComponent
  },
  {
    path: 'games/quiz',
    component: QuizGameComponent
  },
  {
    path: 'games/word-scramble',
    component: WordScrambleComponent
  },
  {
    path: 'games/fill-blank',
    component: FillBlankComponent
  },
  {
    path: 'games/true-false',
    component: TrueFalseComponent
  },
  {
    path: 'games/word-search',
    component: WordSearchComponent
  },
  {
    path: 'games/word-choice',
    component: WordChoiceComponent
  },
  {
    path: 'games/slideshow',
    component: SlideshowComponent
  },
  {
    path: 'games/whats-missing',
    component: WhatsMissingComponent
  },
  {
    path: 'games/bucket-sorting',
    component: BucketSortingComponent
  },
  {
    path: 'games/wheel-of-fortune',
    component: WheelOfFortuneComponent
  },
  {
    path: 'games/build-a-story',
    component: BuildAStoryComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
