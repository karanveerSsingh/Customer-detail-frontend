import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWords',
})
export class LimitWordsPipe implements PipeTransform {
  transform(value: string, limit = 8): string {
    let result: string;
    if (value.length > limit) {
      result = `${value.slice(0, limit)}...`;
    } else {
      result = value;
    }
    return result;
  }
}
