import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordChoiceComponent } from './word-choice.component';

describe('WordChoiceComponent', () => {
  let component: WordChoiceComponent;
  let fixture: ComponentFixture<WordChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
