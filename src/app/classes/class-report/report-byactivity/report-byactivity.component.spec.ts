import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByactivityComponent } from './report-byactivity.component';

describe('ReportByactivityComponent', () => {
  let component: ReportByactivityComponent;
  let fixture: ComponentFixture<ReportByactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
