import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAppDialogComponent } from './show-app-dialog.component';

describe('ShowAppDialogComponent', () => {
  let component: ShowAppDialogComponent;
  let fixture: ComponentFixture<ShowAppDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAppDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
