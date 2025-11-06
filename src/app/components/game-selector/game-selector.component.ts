import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
export class GameSelectorComponent implements OnInit {
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
    },
    {
      id: 'fill-blank',
      name: 'Fill in the Blank',
      description: 'Fill in missing letters to complete the word'
    },
    {
      id: 'true-false',
      name: 'True or False',
      description: 'Decide if statements about the images are true or false'
    },
    {
      id: 'word-search',
      name: 'Word Search',
      description: 'Find hidden words in a letter grid'
    },
    {
      id: 'word-choice',
      name: 'Word Choice',
      description: 'Select the image that matches the word'
    }
  ];

  setId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get setId from route params
    this.setId = this.route.snapshot.params['setId'] || '';
  }

  selectGame(game: Game): void {
    // Navigate to game with selected setId
    if (this.setId) {
      this.router.navigate(['/games', game.id, this.setId]);
    }
  }

  goBack(): void {
    // Navigate back to flashcard set selection (home)
    this.router.navigate(['/']);
  }
}
