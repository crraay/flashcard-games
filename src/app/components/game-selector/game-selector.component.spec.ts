import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { GameSelectorComponent } from './game-selector.component';
import { GamePlayHistoryService } from '../../services/game-play-history.service';

describe('GameSelectorComponent', () => {
  let component: GameSelectorComponent;
  let fixture: ComponentFixture<GameSelectorComponent>;
  let gamePlayHistory: jasmine.SpyObj<GamePlayHistoryService>;
  let router: Router;

  beforeEach(async () => {
    gamePlayHistory = jasmine.createSpyObj('GamePlayHistoryService', ['getAll', 'recordGameClick']);
    gamePlayHistory.getAll.and.returnValue({});

    await TestBed.configureTestingModule({
      imports: [GameSelectorComponent],
      providers: [
        provideRouter([]),
        { provide: GamePlayHistoryService, useValue: gamePlayHistory }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSelectorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort games by last played with recent first and unplayed in catalog order', () => {
    gamePlayHistory.getAll.and.returnValue({
      memory: 2000,
      quiz: 3000,
      matching: 1000
    });

    component.ngOnInit();

    const gameIds = component.games.map(game => game.id);
    expect(gameIds.slice(0, 3)).toEqual(['quiz', 'memory', 'matching']);
    expect(gameIds.slice(3)).toEqual([
      'word-scramble',
      'fill-blank',
      'true-false',
      'word-search',
      'word-choice',
      'slideshow',
      'whats-missing',
      'bucket-sorting',
      'wheel-of-fortune',
      'build-a-story'
    ]);
  });

  it('should record game click and navigate when a game is selected', () => {
    const game = component.games[0];

    component.selectGame(game);

    expect(gamePlayHistory.recordGameClick).toHaveBeenCalledWith(game.id);
    expect(router.navigate).toHaveBeenCalledWith(['/sets', game.id, 'select']);
  });

  it('should navigate to story selector for build-a-story', () => {
    const game = component.games.find(g => g.id === 'build-a-story');
    expect(game).toBeTruthy();

    component.selectGame(game!);

    expect(gamePlayHistory.recordGameClick).toHaveBeenCalledWith('build-a-story');
    expect(router.navigate).toHaveBeenCalledWith(['/stories', 'build-a-story', 'select']);
  });
});
