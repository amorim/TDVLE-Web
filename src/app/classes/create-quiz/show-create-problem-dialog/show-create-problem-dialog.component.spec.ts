import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCreateProblemDialogComponent } from './show-create-problem-dialog.component';

describe('ShowCreateProblemDialogComponent', () => {
  let component: ShowCreateProblemDialogComponent;
  let fixture: ComponentFixture<ShowCreateProblemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCreateProblemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCreateProblemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
