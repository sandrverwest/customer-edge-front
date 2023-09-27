import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usaPhone'
})
export class UsaPhonePipe implements PipeTransform {

  transform(value: string): string {
    const cleanedValue = value.replace(/\D/g, '')

    if (cleanedValue.length === 10) {
      return `(${cleanedValue.slice(0, 3)}) ${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6)}`
    } else {
      return cleanedValue
    }
  }

}
