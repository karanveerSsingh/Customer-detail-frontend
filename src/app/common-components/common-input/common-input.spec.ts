import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonInput } from './common-input';

describe('CommonInput', () => {
  let component: CommonInput;
  let fixture: ComponentFixture<CommonInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
