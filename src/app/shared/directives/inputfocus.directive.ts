import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInputfocus]'
})
export class InputfocusDirective {

  constructor(private input: ElementRef) {}

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

}
