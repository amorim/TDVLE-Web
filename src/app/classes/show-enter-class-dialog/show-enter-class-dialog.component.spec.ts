import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEnterClassDialogComponent } from './show-enter-class-dialog.component';

describe('ShowEnterClassDialogComponent', () => {
  let component: ShowEnterClassDialogComponent;
  let fixture: ComponentFixture<ShowEnterClassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEnterClassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEnterClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
