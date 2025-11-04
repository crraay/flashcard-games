import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlashcardSet } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fg-set-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './set-selector.component.html',
  styleUrl: './set-selector.component.scss'
})
export class SetSelectorComponent implements OnInit {
  @Output() setSelected = new EventEmitter<FlashcardSet>();

  sets: FlashcardSet[] = [];

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.sets = this.flashcardService.getAllSets();
  }

  selectSet(set: FlashcardSet): void {
    this.setSelected.emit(set);
  }
}
