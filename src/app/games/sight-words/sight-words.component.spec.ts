import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { SightWordsComponent } from './sight-words.component';

describe('SightWordsComponent', () => {
  let component: SightWordsComponent;
  let fixture: ComponentFixture<SightWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightWordsComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: { set: 'sw-his-give-is' },
              url: [{ path: 'games' }, { path: 'sight-words' }]
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SightWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
