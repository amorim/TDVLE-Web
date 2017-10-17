import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPeopleComponent } from './find-people.component';

describe('FindPeopleComponent', () => {
  let component: FindPeopleComponent;
  let fixture: ComponentFixture<FindPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
