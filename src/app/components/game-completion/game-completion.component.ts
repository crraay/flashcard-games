import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizeService } from '../../services/prize.service';
import { Prize } from '../../models';

@Component({
  selector: 'fg-game-completion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-completion.component.html',
  styleUrl: './game-completion.component.scss'
})
export class GameCompletionComponent implements OnInit {
  @Input() title: string = '🎉 Congratulations! 🎉';
  @Input() message: string = '';
  @Input() showRestart: boolean = true;
  @Output() restart = new EventEmitter<void>();

  prize: Prize | null = null;
  prizeImageUnavailable = false;

  private prizeImageErrorAttempts = 0;
  private readonly maxPrizeImageAttempts: number;

  constructor(private prizeService: PrizeService) {
    this.maxPrizeImageAttempts = this.prizeService.getAllPrizes().length;
  }

  ngOnInit(): void {
    this.prize = this.prizeService.getRandomPrize();
  }

  onPrizeImageError(): void {
    this.prizeImageErrorAttempts++;
    if (this.prizeImageErrorAttempts >= this.maxPrizeImageAttempts) {
      this.prizeImageUnavailable = true;
      return;
    }
    this.prize = this.prizeService.getRandomPrize();
  }

  getFormattedMessage(): string {
    if (!this.message) return '';
    return this.message.replace(/\n/g, '<br>');
  }

  onRestart(): void {
    this.restart.emit();
  }
}
