import {AfterViewInit, Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAutoResizeTextarea]'
})
export class AutoResizeTextareaDirective implements OnInit, AfterViewInit {

  constructor(
    private hostElement: ElementRef<HTMLTextAreaElement>,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.listen(this.hostElement.nativeElement, 'input', ()=>{
      this.adjustTextareaHeight()
    })
  }

  ngAfterViewInit() {
    this.adjustTextareaHeight()
  }

  adjustTextareaHeight() {
    this.renderer.setStyle(this.hostElement.nativeElement, 'height', 'auto')
    this.renderer.setStyle(this.hostElement.nativeElement, 'height', `${this.hostElement.nativeElement.scrollHeight}px`)
  }
}
