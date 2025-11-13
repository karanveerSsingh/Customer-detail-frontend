import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPayment } from './dialog-add-payment';

describe('DialogAddPayment', () => {
  let component: DialogAddPayment;
  let fixture: ComponentFixture<DialogAddPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
