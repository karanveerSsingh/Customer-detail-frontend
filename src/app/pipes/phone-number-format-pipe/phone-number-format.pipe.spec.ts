import { PhoneNumberFormatPipe } from './phone-number-format.pipe';

describe('PhoneNumberFormatPipe', () => {
  let pipe: PhoneNumberFormatPipe;
  beforeEach(() => {
    pipe = new PhoneNumberFormatPipe();
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return an empty string if the input is null or undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });
  it('should return the number as is if it starts with "+91"', () => {
    expect(pipe.transform('+911234567890')).toBe('+911234567890');
  });
  it('should add "+" to the number if it starts with "91" and has 12 digits', () => {
    expect(pipe.transform('911234567890')).toBe('+911234567890');
  });
  it('should add "+91" to the number if it has 10 digits', () => {
    expect(pipe.transform('1234567890')).toBe('+911234567890');
  });
  it('should return the number as is if it does not match any condition', () => {
    expect(pipe.transform('001234567890')).toBe('001234567890');
    expect(pipe.transform('123')).toBe('123');
  });
});
