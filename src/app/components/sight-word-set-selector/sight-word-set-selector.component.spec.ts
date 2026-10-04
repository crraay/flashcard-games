import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { SightWordSetSelectorComponent } from './sight-word-set-selector.component';

describe('SightWordSetSelectorComponent', () => {
  let component: SightWordSetSelectorComponent;
  let fixture: ComponentFixture<SightWordSetSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightWordSetSelectorComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { gameId: 'sight-words' }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SightWordSetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
