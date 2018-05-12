import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCreateStreamItemDialogComponent } from './show-create-stream-item-dialog.component';

describe('ShowCreateStreamItemDialogComponent', () => {
  let component: ShowCreateStreamItemDialogComponent;
  let fixture: ComponentFixture<ShowCreateStreamItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCreateStreamItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCreateStreamItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
