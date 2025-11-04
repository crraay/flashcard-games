import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSetSelectorComponent } from './flashcard-set-selector.component';

describe('FlashcardSetSelectorComponent', () => {
  let component: FlashcardSetSelectorComponent;
  let fixture: ComponentFixture<FlashcardSetSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardSetSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardSetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
