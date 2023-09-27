import {Directive, ElementRef, forwardRef, HostListener, Input, Renderer2} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Directive({
  selector:
    '[contenteditable][formControlName],' +
    '[contenteditable][formControl],' +
    '[contenteditable][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContenteditableValueAccessor),
      multi: true,
    }
  ]
})
export class ContenteditableValueAccessor implements ControlValueAccessor {
  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private currencyPipe: CurrencyPipe
  ) {}


  private onTouched = () => {};

  private onChange: (value: string) => void = () => {};

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }


  @HostListener('dblclick')
  editMode() {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        'contenteditable',
        'true',
      );
    console.log('dbclicked')
  }
  @HostListener('input')
  onInput() {
    this.onChange(this.elementRef.nativeElement.textContent);
  }

  @HostListener('blur')
  onBlur() {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'contenteditable',
      'false',
    );
    console.log('blured')
    // this.onTouched();
  }

  // setDisabledState(disabled: boolean) {
  //   console.log('disaple', disabled)
  //   this.renderer.setAttribute(
  //     this.elementRef.nativeElement,
  //     'contenteditable',
  //     String(!disabled),
  //   );
  // }

  writeValue(value: string) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'textContent',
      value,
    );
  }

}
