import { Routes } from '@angular/router';
import { GameSelectorComponent } from './components/game-selector/game-selector.component';
import { FlashcardSetSelectorComponent } from './components/flashcard-set-selector/flashcard-set-selector.component';
import { MatchingGameComponent } from './games/matching-game/matching-game.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { QuizGameComponent } from './games/quiz-game/quiz-game.component';
import { WordScrambleComponent } from './games/word-scramble/word-scramble.component';
import { FillBlankComponent } from './games/fill-blank/fill-blank.component';
import { TrueFalseComponent } from './games/true-false/true-false.component';
import { WordSearchComponent } from './games/word-search/word-search.component';

export const routes: Routes = [
  {
    path: '',
    component: GameSelectorComponent
  },
  {
    path: 'games/:gameId/select',
    component: FlashcardSetSelectorComponent
  },
  {
    path: 'games/matching/:setId',
    component: MatchingGameComponent
  },
  {
    path: 'games/memory/:setId',
    component: MemoryGameComponent
  },
  {
    path: 'games/quiz/:setId',
    component: QuizGameComponent
  },
  {
    path: 'games/word-scramble/:setId',
    component: WordScrambleComponent
  },
  {
    path: 'games/fill-blank/:setId',
    component: FillBlankComponent
  },
  {
    path: 'games/true-false/:setId',
    component: TrueFalseComponent
  },
  {
    path: 'games/word-search/:setId',
    component: WordSearchComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
