import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledButton } from './filed-button';

describe('FiledButton', () => {
  let component: FiledButton;
  let fixture: ComponentFixture<FiledButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiledButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiledButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
