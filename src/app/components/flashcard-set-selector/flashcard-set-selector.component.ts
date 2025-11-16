import { Component, OnInit } from '@angular/core';
import { FlashcardSet } from '../../models';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'fg-flashcard-set-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcard-set-selector.component.html',
  styleUrl: './flashcard-set-selector.component.scss'
})
export class FlashcardSetSelectorComponent implements OnInit {
  sets: FlashcardSet[] = [];

  constructor(
    private flashcardService: FlashcardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sets = this.flashcardService.getAllSets();
  }

  selectSet(set: FlashcardSet): void {
    // Navigate to game selector with selected set
    this.router.navigate(['/sets', set.id, 'select']);
  }

  goBack(): void {
    // Already on home page, so no back navigation needed
    // This method kept for consistency, but won't be used since we're on the home page
    this.router.navigate(['/']);
  }
}
