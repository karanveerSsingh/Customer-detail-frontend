import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderButton } from './border-button';

describe('BorderButton', () => {
  let component: BorderButton;
  let fixture: ComponentFixture<BorderButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorderButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
