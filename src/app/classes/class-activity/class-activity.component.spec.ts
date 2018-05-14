import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassActivityComponent } from './class-activity.component';

describe('ClassActivityComponent', () => {
  let component: ClassActivityComponent;
  let fixture: ComponentFixture<ClassActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
