import { Routes } from '@angular/router';
import { GameSelectorComponent } from './components/game-selector/game-selector.component';
import { FlashcardSetSelectorComponent } from './components/flashcard-set-selector/flashcard-set-selector.component';
import { MatchingGameComponent } from './games/matching-game/matching-game.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { QuizGameComponent } from './games/quiz-game/quiz-game.component';

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
    path: '**',
    redirectTo: ''
  }
];
