import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPikerInput } from './auto-piker-input';

describe('AutoPikerInput', () => {
  let component: AutoPikerInput;
  let fixture: ComponentFixture<AutoPikerInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoPikerInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoPikerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
