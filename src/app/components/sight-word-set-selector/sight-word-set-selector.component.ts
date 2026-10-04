import { Component, OnInit } from '@angular/core';
import { SightWordSet } from '../../models';
import { SightWordService } from '../../services/sight-word.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fg-sight-word-set-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sight-word-set-selector.component.html',
  styleUrl: './sight-word-set-selector.component.scss'
})
export class SightWordSetSelectorComponent implements OnInit {
  sets: SightWordSet[] = [];
  gameId: string = '';
  selectedSetId: string | null = null;

  constructor(
    private sightWordService: SightWordService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sets = this.sightWordService.getAllSets();
    this.gameId = this.route.snapshot.params['gameId'] || '';

    if (!this.gameId) {
      this.router.navigate(['/']);
    }
  }

  selectSet(setId: string): void {
    this.selectedSetId = this.selectedSetId === setId ? null : setId;
  }

  isSetSelected(setId: string): boolean {
    return this.selectedSetId === setId;
  }

  getSentenceCount(set: SightWordSet): number {
    return set.sentences.length;
  }

  startGame(): void {
    if (!this.selectedSetId || !this.gameId) {
      return;
    }

    this.router.navigate(['/games', this.gameId], {
      queryParams: { set: this.selectedSetId }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
