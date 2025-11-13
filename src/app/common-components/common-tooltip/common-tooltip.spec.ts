import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTooltip } from './common-tooltip';

describe('CommonTooltip', () => {
  let component: CommonTooltip;
  let fixture: ComponentFixture<CommonTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonTooltip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
