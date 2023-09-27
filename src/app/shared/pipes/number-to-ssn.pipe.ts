import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToSsn'
})
export class NumberToSsnPipe implements PipeTransform {

  transform(value: string): string  {
    const trimmedValue = value.trim()
    if (trimmedValue.length === 9) {
      return trimmedValue.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
    } else {
      return trimmedValue
    }
  }

}
