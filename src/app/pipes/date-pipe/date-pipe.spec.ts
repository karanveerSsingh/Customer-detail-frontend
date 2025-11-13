import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFormatPipe } from './date-pipe';

@Component({
  template: `
    <div id="dateOutput">{{ testDate | dateFormatPipe }}</div>
  `,
  standalone: true,
  imports: [DateFormatPipe],
})
class TestComponent {
  testDate: Date | string | null | undefined = new Date('2025-03-11T12:00:00Z');
}

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;
  let datePipe: DatePipe;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateFormatPipe, TestComponent],
      providers: [DatePipe, { provide: DateFormatPipe, useClass: DateFormatPipe }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    datePipe = TestBed.inject(DatePipe);
    pipe = TestBed.inject(DateFormatPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a valid Date object correctly', () => {
    const date = new Date('2025-03-11T12:00:00Z');
    const expected = datePipe.transform(date, 'dd-MMM-yyyy');

    if (expected) {
      expect(pipe.transform(date)).toBe(expected);
    }

    // Test in component context
    fixture.componentInstance.testDate = date;
    fixture.detectChanges();
    const outputElement = fixture.nativeElement.querySelector('#dateOutput');
    expect(outputElement.textContent.trim()).toBe(expected);
  });

  it('should format a valid date string correctly', () => {
    const dateString = '2025-03-11T12:00:00Z';
    const expected = datePipe.transform(dateString, 'dd-MMM-yyyy');

    if (expected) {
      expect(pipe.transform(dateString)).toBe(expected);
    }

    // Test in component context
    fixture.componentInstance.testDate = dateString;
    fixture.detectChanges();
    const outputElement = fixture.nativeElement.querySelector('#dateOutput');
    expect(outputElement.textContent.trim()).toBe(expected);
  });

  it('should return an empty string for null input', () => {
    expect(pipe.transform(null)).toBe('');

    // Test in component context
    fixture.componentInstance.testDate = null;
    fixture.detectChanges();
    const outputElement = fixture.nativeElement.querySelector('#dateOutput');
    expect(outputElement.textContent.trim()).toBe('');
  });

  it('should return an empty string for undefined input', () => {
    expect(pipe.transform(undefined)).toBe('');

    // Test in component context
    fixture.componentInstance.testDate = undefined;
    fixture.detectChanges();
    const outputElement = fixture.nativeElement.querySelector('#dateOutput');
    expect(outputElement.textContent.trim()).toBe('');
  });

  it('should return an empty string for invalid date input', () => {
    spyOn(pipe['datePipe'], 'transform').and.returnValue(null);
    expect(pipe.transform('invalid-date')).toBe('');
  });

  it('should return an empty string when DatePipe throws an error', () => {
    spyOn(pipe['datePipe'], 'transform').and.throwError('Invalid date');
    expect(pipe.transform('invalid-date')).toBe('');
  });
});
