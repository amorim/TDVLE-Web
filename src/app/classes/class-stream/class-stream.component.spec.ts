import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassStreamComponent } from './class-stream.component';

describe('ClassStreamComponent', () => {
  let component: ClassStreamComponent;
  let fixture: ComponentFixture<ClassStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
