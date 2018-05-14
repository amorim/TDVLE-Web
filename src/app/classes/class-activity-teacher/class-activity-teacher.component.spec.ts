import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassActivityTeacherComponent } from './class-activity-teacher.component';

describe('ClassActivityTeacherComponent', () => {
  let component: ClassActivityTeacherComponent;
  let fixture: ComponentFixture<ClassActivityTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassActivityTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassActivityTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
