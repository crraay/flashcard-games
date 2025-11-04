import { Component, OnInit } from '@angular/core';
import { FlashcardSet } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fg-flashcard-set-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcard-set-selector.component.html',
  styleUrl: './flashcard-set-selector.component.scss'
})
export class FlashcardSetSelectorComponent implements OnInit {
  sets: FlashcardSet[] = [];
  gameId: string = '';

  constructor(
    private flashcardService: FlashcardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sets = this.flashcardService.getAllSets();
    // Get game ID from route (e.g., 'matching')
    this.gameId = this.route.snapshot.params['gameId'] || '';
  }

  selectSet(set: FlashcardSet): void {
    if (this.gameId) {
      // Navigate to game with selected set
      this.router.navigate(['/games', this.gameId, set.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
