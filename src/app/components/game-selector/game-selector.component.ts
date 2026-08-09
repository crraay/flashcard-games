import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GamePlayHistoryService } from '../../services/game-play-history.service';

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
  private readonly catalog: Game[] = [
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
    },
    {
      id: 'slideshow',
      name: 'Slideshow',
      description: 'Browse flashcards one at a time with forward and back navigation',
      imagePath: 'images/games/slideshow.png'
    },
    {
      id: 'whats-missing',
      name: "What's Missing?",
      description: 'Remember the images, then guess which one disappeared',
      imagePath: 'images/games/whats-missing.png'
    },
    {
      id: 'bucket-sorting',
      name: 'Bucket Sorting',
      description: 'Drag each flashcard into the set bucket it belongs to',
      imagePath: 'images/games/bucket-sorting.png'
    },
    {
      id: 'wheel-of-fortune',
      name: 'Wheel of Fortune',
      description: 'Spin the wheel to land on a random flashcard',
      imagePath: 'images/games/wheel-of-fortune.png'
    },
    {
      id: 'build-a-story',
      name: 'Build a Story',
      description: 'Put the words in order to build each sentence of a story',
      imagePath: 'images/games/build-a-story.png'
    }
  ];

  games: Game[] = [];

  constructor(
    private router: Router,
    private gamePlayHistory: GamePlayHistoryService
  ) {}

  ngOnInit(): void {
    this.games = this.sortGamesByLastPlayed(this.catalog);
  }

  selectGame(game: Game): void {
    this.gamePlayHistory.recordGameClick(game.id);
    if (game.id === 'build-a-story') {
      this.router.navigate(['/stories', game.id, 'select']);
      return;
    }
    this.router.navigate(['/sets', game.id, 'select']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  private sortGamesByLastPlayed(games: Game[]): Game[] {
    const lastPlayed = this.gamePlayHistory.getAll();
    const catalogOrder = new Map(games.map((game, index) => [game.id, index]));

    return [...games].sort((a, b) => {
      const aTime = lastPlayed[a.id];
      const bTime = lastPlayed[b.id];
      const aPlayed = aTime != null;
      const bPlayed = bTime != null;

      if (aPlayed && bPlayed) {
        return bTime - aTime;
      }
      if (aPlayed) {
        return -1;
      }
      if (bPlayed) {
        return 1;
      }

      return (catalogOrder.get(a.id) ?? 0) - (catalogOrder.get(b.id) ?? 0);
    });
  }
}
