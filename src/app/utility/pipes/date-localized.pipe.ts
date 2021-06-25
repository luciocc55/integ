import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { HelperFunctions } from './helper';

@Pipe({
  name: 'localizedDate',
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private helper: HelperFunctions) {}

  transform(value: any, pattern: string): any {
    let lang = this.helper.getLang();
    const datePipe: DatePipe = new DatePipe(lang);
    return datePipe.transform(value, pattern);
  }
}
