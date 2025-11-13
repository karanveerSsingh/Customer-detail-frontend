import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeTable } from './custome-table';

describe('CustomeTable', () => {
  let component: CustomeTable;
  let fixture: ComponentFixture<CustomeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
