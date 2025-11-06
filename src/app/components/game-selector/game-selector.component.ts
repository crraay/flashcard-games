import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';

interface Game {
  id: string;
  name: string;
  description: string;
  icon?: string;
  imagePath?: string;
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
      description: 'Match images with their captions by drawing lines',
      imagePath: 'images/games/matching.png'
    },
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Find matching pairs by flipping cards',
      imagePath: 'images/games/memory.png'
    },
    {
      id: 'quiz',
      name: 'Quiz Game',
      description: 'Test your knowledge with multiple choice questions',
      imagePath: 'images/games/quiz.png'
    },
    {
      id: 'word-scramble',
      name: 'Word Scramble',
      description: 'Unscramble letters to spell the word shown in the image',
      imagePath: 'images/games/scramble.png'
    },
    {
      id: 'fill-blank',
      name: 'Fill in the Blank',
      description: 'Fill in missing letters to complete the word',
      imagePath: 'images/games/fill-blank.png'
    },
    {
      id: 'true-false',
      name: 'True or False',
      description: 'Decide if statements about the images are true or false',
      imagePath: 'images/games/true-false.png'
    },
    {
      id: 'word-search',
      name: 'Word Search',
      description: 'Find hidden words in a letter grid',
      imagePath: 'images/games/word-search.png'
    },
    {
      id: 'word-choice',
      name: 'Word Choice',
      description: 'Select the image that matches the word',
      imagePath: 'images/games/word-choice.png'
    }
  ];

  setId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Optional() @Inject(APP_BASE_HREF) private baseHref: string
  ) {
    this.baseHref = this.baseHref || '/';
  }

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

  getImagePath(path: string | undefined): string {
    if (!path) return '';
    // Remove leading slash from baseHref if present, and ensure path starts correctly
    const base = this.baseHref.endsWith('/') ? this.baseHref : this.baseHref + '/';
    // Remove leading slash from path if present
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return base + cleanPath;
  }
}
