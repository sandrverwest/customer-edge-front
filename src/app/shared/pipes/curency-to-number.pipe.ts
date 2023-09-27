import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyToNumber'
})
export class CurrencyToNumberPipe implements PipeTransform {
  transform(value: string): number | null {

    if(value === null) {
      return null
    }
    const numericString = value.replace(/[^\d.-]/g, '');

    const numericValue = parseFloat(numericString);

    return numericValue;
  }
}
