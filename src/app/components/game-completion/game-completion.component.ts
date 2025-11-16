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

  constructor(private prizeService: PrizeService) {}

  ngOnInit(): void {
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
