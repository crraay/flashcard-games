import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fg-game-completion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-completion.component.html',
  styleUrl: './game-completion.component.scss'
})
export class GameCompletionComponent {
  @Input() title: string = '🎉 Congratulations! 🎉';
  @Input() message: string = '';
  @Input() showRestart: boolean = true;
  @Output() restart = new EventEmitter<void>();

  getFormattedMessage(): string {
    if (!this.message) return '';
    return this.message.replace(/\n/g, '<br>');
  }

  onRestart(): void {
    this.restart.emit();
  }
}
