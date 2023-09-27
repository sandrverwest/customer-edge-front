import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToEin'
})
export class NumberToEinPipe implements PipeTransform {

  transform(value: string): string {
    const trimmedValue = value.trim()
    if (trimmedValue.length === 9) {
      return trimmedValue.replace(/(\d{2})(\d{7})/, '$1-$2')
    } else {
      return trimmedValue
    }
  }

}
