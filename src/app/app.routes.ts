import { Routes } from '@angular/router';
import { GameSelectorComponent } from './components/game-selector/game-selector.component';
import { FlashcardSetSelectorComponent } from './components/flashcard-set-selector/flashcard-set-selector.component';
import { MatchingGameComponent } from './games/matching-game/matching-game.component';

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
    path: 'games/:gameId/:setId',
    component: MatchingGameComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
