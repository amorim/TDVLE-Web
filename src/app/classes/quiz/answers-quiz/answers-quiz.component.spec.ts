import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersQuizComponent } from './answers-quiz.component';

describe('AnswersQuizComponent', () => {
  let component: AnswersQuizComponent;
  let fixture: ComponentFixture<AnswersQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
