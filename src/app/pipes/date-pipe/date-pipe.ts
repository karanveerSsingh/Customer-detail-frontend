import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
type acceptValueTYpe = Date | string | null | undefined;
@Pipe({
  name: 'dateFormatPipe',
  pure: true,
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  private readonly datePipe = new DatePipe('en-US');

  transform(value: acceptValueTYpe): string {
    if (!value) {
      return '';
    }

    try {
      const modifiedDate = this.datePipe.transform(value, 'dd-MMM-yyyy');
      if (modifiedDate) {
        return modifiedDate;
      } else {
        return '';
      }
    } catch {
      return '';
    }
  }
}
