import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { BuildAStoryComponent } from './build-a-story.component';

describe('BuildAStoryComponent', () => {
  let component: BuildAStoryComponent;
  let fixture: ComponentFixture<BuildAStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildAStoryComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: { story: 'story-oats-for-toast' },
              url: [{ path: 'games' }, { path: 'build-a-story' }]
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildAStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
