import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat',
  pure: true,
  standalone: true,
})
export class PhoneNumberFormatPipe implements PipeTransform {
  transform(number: string | null): string {
    if (!number) {
      return '';
    }
    if (number.startsWith('+91')) {
      return number;
    }
    if (number.startsWith('91') && number.length === 12) {
      return `+${number}`;
    }
    if (number.length === 10) {
      return `+91${number}`;
    }
    return number;
  }
}
