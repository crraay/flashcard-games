import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { StorySelectorComponent } from './story-selector.component';

describe('StorySelectorComponent', () => {
  let component: StorySelectorComponent;
  let fixture: ComponentFixture<StorySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorySelectorComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { gameId: 'build-a-story' }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
