import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCreateClassDialogComponent } from './show-create-class-dialog.component';

describe('ShowCreateClassDialogComponent', () => {
  let component: ShowCreateClassDialogComponent;
  let fixture: ComponentFixture<ShowCreateClassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCreateClassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCreateClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
