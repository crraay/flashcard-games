import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Game {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

@Component({
  selector: 'fg-game-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-selector.component.html',
  styleUrl: './game-selector.component.scss'
})
export class GameSelectorComponent {
  games: Game[] = [
    {
      id: 'matching',
      name: 'Matching Game',
      description: 'Match images with their captions by drawing lines'
    },
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Find matching pairs by flipping cards'
    },
    {
      id: 'quiz',
      name: 'Quiz Game',
      description: 'Test your knowledge with multiple choice questions'
    },
    {
      id: 'word-scramble',
      name: 'Word Scramble',
      description: 'Unscramble letters to spell the word shown in the image'
    }
  ];

  constructor(private router: Router) {}

  selectGame(game: Game): void {
    // Navigate to flashcard selector for the selected game
    this.router.navigate(['/games', game.id, 'select']);
  }
}
