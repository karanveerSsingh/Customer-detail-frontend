import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistory } from './dialog-history';

describe('DialogHistory', () => {
  let component: DialogHistory;
  let fixture: ComponentFixture<DialogHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
