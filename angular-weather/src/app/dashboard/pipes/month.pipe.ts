import { Pipe, PipeTransform } from '@angular/core';

import { MONTHS } from '../contants';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: String | 'xxx', ...args: unknown[]): string {
    return MONTHS[value as string];
  }

}
