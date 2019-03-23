import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByStudentComponent } from './report-by-student.component';

describe('ReportByStudentComponent', () => {
  let component: ReportByStudentComponent;
  let fixture: ComponentFixture<ReportByStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
