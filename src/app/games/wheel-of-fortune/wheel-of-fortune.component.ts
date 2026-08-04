import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlashcardSet, Flashcard, Prize } from '../../models';
import { FlashcardService } from '../../services/flashcard.service';
import { PrizeService } from '../../services/prize.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HighlightedCaptionComponent } from '../../components/highlighted-caption/highlighted-caption.component';

interface WheelAction {
  id: string;
  label: string;
  emoji: string;
}

interface WheelSector {
  kind: 'flashcard' | 'prize' | 'action';
  color: string;
  flashcard?: Flashcard;
  prize?: Prize;
  action?: WheelAction;
}

@Component({
  selector: 'fg-wheel-of-fortune',
  standalone: true,
  imports: [CommonModule, HighlightedCaptionComponent],
  templateUrl: './wheel-of-fortune.component.html',
  styleUrl: './wheel-of-fortune.component.scss'
})
export class WheelOfFortuneComponent implements OnInit, OnDestroy {
  private static readonly SPIN_DURATION_MS = 4500;
  private static readonly MIN_FULL_TURNS = 4;
  private static readonly MAX_EXTRA_TURNS = 3;
  private static readonly PRIZE_COUNT = 3;
  private static readonly DRAG_THRESHOLD_PX = 16;
  private static readonly FLASHCARD_COLORS = [
    '#e53935',
    '#fb8c00',
    '#fdd835',
    '#43a047',
    '#1e88e5',
    '#8e24aa',
    '#00acc1',
    '#d81b60',
    '#6d4c41',
    '#546e7a'
  ];
  private static readonly PRIZE_COLORS = [
    '#f093fb',
    '#f5576c',
    '#ec407a',
    '#e91e63',
    '#d81b60',
    '#c2185b'
  ];
  private static readonly ACTION_COLORS = [
    '#00897b',
    '#00acc1',
    '#26a69a',
    '#0097a7',
    '#00796b',
    '#4db6ac'
  ];
  private static readonly ACTIONS: WheelAction[] = [
    { id: 'clap', label: 'Clap your hands', emoji: '👏' },
    { id: 'stamp', label: 'Stamp your feet', emoji: '🦶' },
    { id: 'brush', label: 'Brush your teeth', emoji: '🪥' }
  ];

  selectedSets: FlashcardSet[] = [];
  sectors: WheelSector[] = [];
  gameId = '';
  noFlashcards = false;

  rotation = 0;
  isSpinning = false;
  showResult = false;
  resultSector: WheelSector | null = null;

  private previousBodyOverflow = '';
  private previousHtmlOverflow = '';

  private spinTimeout: ReturnType<typeof setTimeout> | null = null;
  private pendingResultIndex: number | null = null;
  private dragPointerId: number | null = null;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragIntent = false;
  private suppressNextClick = false;

  constructor(
    private flashcardService: FlashcardService,
    private prizeService: PrizeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const setsParam = this.route.snapshot.queryParams['sets'];
    if (!setsParam) {
      this.router.navigate(['/']);
      return;
    }

    const setIds = setsParam.split(',').filter((id: string) => id.trim() !== '');
    if (setIds.length === 0) {
      this.router.navigate(['/']);
      return;
    }

    const urlSegments = this.route.snapshot.url;
    this.gameId = urlSegments.length > 1 ? urlSegments[1].path : '';

    const allSets = this.flashcardService.getAllSets();
    this.selectedSets = allSets.filter(s => setIds.includes(s.id));

    if (this.selectedSets.length === 0) {
      this.router.navigate(['/']);
      return;
    }

    this.initializeGame();
    this.lockPageScroll();
  }

  ngOnDestroy(): void {
    this.unlockPageScroll();
    this.clearSpinTimeout();
  }

  initializeGame(): void {
    if (this.selectedSets.length === 0) return;

    const setIds = this.selectedSets.map(s => s.id);
    const flashcards = this.flashcardService.getFlashcardsBySetIds(setIds);
    this.noFlashcards = flashcards.length === 0;

    if (this.noFlashcards) {
      this.sectors = [];
      return;
    }

    const sectors: WheelSector[] = flashcards.map(flashcard => ({
      kind: 'flashcard' as const,
      flashcard,
      color: ''
    }));

    for (const prize of this.pickRandomPrizes(WheelOfFortuneComponent.PRIZE_COUNT)) {
      sectors.push({ kind: 'prize', prize, color: '' });
    }

    for (const action of WheelOfFortuneComponent.ACTIONS) {
      sectors.push({ kind: 'action', action, color: '' });
    }

    this.shuffleArray(sectors);
    this.sectors = this.assignSectorColors(sectors);

    this.rotation = 0;
    this.isSpinning = false;
    this.showResult = false;
    this.resultSector = null;
    this.pendingResultIndex = null;
  }

  get sectorAngle(): number {
    return this.sectors.length > 0 ? 360 / this.sectors.length : 360;
  }

  get conicGradient(): string {
    if (this.sectors.length === 0) {
      return '#ccc';
    }

    if (this.sectors.length === 1) {
      return this.sectors[0].color;
    }

    const stops = this.sectors
      .map((sector, index) => {
        const start = index * this.sectorAngle;
        const end = (index + 1) * this.sectorAngle;
        return `${sector.color} ${start}deg ${end}deg`;
      })
      .join(', ');

    return `conic-gradient(from -90deg, ${stops})`;
  }

  get canSpin(): boolean {
    return !this.noFlashcards && !this.isSpinning && !this.showResult && this.sectors.length > 0;
  }

  getResultLabel(sector: WheelSector): string {
    if (sector.kind === 'flashcard') return sector.flashcard?.caption ?? '';
    if (sector.kind === 'prize') return sector.prize?.caption ?? '';
    return sector.action?.label ?? '';
  }

  /** Mid-angle of sector i in degrees (0 = top, clockwise). */
  getSectorMidAngle(index: number): number {
    return index * this.sectorAngle + this.sectorAngle / 2;
  }

  getHighlightPatterns(flashcardId: string): string[] | undefined {
    return this.flashcardService.getHighlightPatternsForFlashcard(flashcardId, this.selectedSets);
  }

  onWheelPointerDown(event: PointerEvent): void {
    if (!this.canSpin) return;

    this.dragPointerId = event.pointerId;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragIntent = false;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  onWheelPointerMove(event: PointerEvent): void {
    if (this.dragPointerId !== event.pointerId || this.dragIntent) return;

    const dx = event.clientX - this.dragStartX;
    const dy = event.clientY - this.dragStartY;
    if (Math.hypot(dx, dy) >= WheelOfFortuneComponent.DRAG_THRESHOLD_PX) {
      this.dragIntent = true;
    }
  }

  onWheelPointerUp(event: PointerEvent): void {
    if (this.dragPointerId !== event.pointerId) return;

    const wasDrag = this.dragIntent;
    this.resetDragState(event.currentTarget as HTMLElement);

    if (wasDrag && this.canSpin) {
      this.suppressNextClick = true;
      this.spin();
    }
  }

  onWheelPointerCancel(event: PointerEvent): void {
    if (this.dragPointerId !== event.pointerId) return;
    this.resetDragState(event.currentTarget as HTMLElement);
  }

  onWheelClick(): void {
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }
    this.spin();
  }

  spin(): void {
    if (!this.canSpin) return;

    const index = Math.floor(Math.random() * this.sectors.length);
    this.pendingResultIndex = index;

    const sectorCenter = index * this.sectorAngle + this.sectorAngle / 2;
    const desiredMod = (360 - sectorCenter) % 360;
    const currentMod = ((this.rotation % 360) + 360) % 360;
    let delta = (desiredMod - currentMod + 360) % 360;
    if (delta < 20) {
      delta += 360;
    }

    const fullTurns =
      WheelOfFortuneComponent.MIN_FULL_TURNS +
      Math.floor(Math.random() * (WheelOfFortuneComponent.MAX_EXTRA_TURNS + 1));

    this.isSpinning = true;
    this.rotation = this.rotation + fullTurns * 360 + delta;

    this.clearSpinTimeout();
    this.spinTimeout = setTimeout(() => {
      this.finishSpin();
    }, WheelOfFortuneComponent.SPIN_DURATION_MS + 100);
  }

  onSpinTransitionEnd(event: TransitionEvent): void {
    if (event.propertyName !== 'transform' || !this.isSpinning) return;
    this.finishSpin();
  }

  dismissResult(): void {
    if (!this.showResult) return;
    this.showResult = false;
    this.resultSector = null;
  }

  goBack(): void {
    if (this.gameId) {
      this.router.navigate(['/sets', this.gameId, 'select']);
    } else {
      this.router.navigate(['/']);
    }
  }

  private assignSectorColors(sectors: WheelSector[]): WheelSector[] {
    const kindCounters: Record<WheelSector['kind'], number> = {
      flashcard: 0,
      prize: 0,
      action: 0
    };

    return sectors.map(sector => {
      const index = kindCounters[sector.kind]++;
      const palette = this.getColorPaletteForKind(sector.kind);
      return {
        ...sector,
        color: palette[index % palette.length]
      };
    });
  }

  private getColorPaletteForKind(kind: WheelSector['kind']): string[] {
    switch (kind) {
      case 'prize':
        return WheelOfFortuneComponent.PRIZE_COLORS;
      case 'action':
        return WheelOfFortuneComponent.ACTION_COLORS;
      default:
        return WheelOfFortuneComponent.FLASHCARD_COLORS;
    }
  }

  private resetDragState(element: HTMLElement): void {
    if (this.dragPointerId != null && element.hasPointerCapture(this.dragPointerId)) {
      element.releasePointerCapture(this.dragPointerId);
    }
    this.dragPointerId = null;
    this.dragIntent = false;
  }

  private pickRandomPrizes(count: number): Prize[] {
    const prizes = this.prizeService.getAllPrizes();
    this.shuffleArray(prizes);
    return prizes.slice(0, Math.min(count, prizes.length));
  }

  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private finishSpin(): void {
    if (!this.isSpinning) return;

    this.clearSpinTimeout();
    this.isSpinning = false;

    if (this.pendingResultIndex == null) return;

    this.resultSector = this.sectors[this.pendingResultIndex];
    this.pendingResultIndex = null;
    this.showResult = true;
  }

  private clearSpinTimeout(): void {
    if (this.spinTimeout != null) {
      clearTimeout(this.spinTimeout);
      this.spinTimeout = null;
    }
  }

  private lockPageScroll(): void {
    this.previousBodyOverflow = document.body.style.overflow;
    this.previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  private unlockPageScroll(): void {
    document.body.style.overflow = this.previousBodyOverflow;
    document.documentElement.style.overflow = this.previousHtmlOverflow;
  }
}
