import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit, OnChanges {

  @Input() appTooltip:string | number | undefined
  tooltip: HTMLElement = this.renderer.createElement('div')
  constructor(
    private hostElement: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.tooltip, 'tooltip')

    this.renderer.setStyle(this.hostElement.nativeElement, 'position', 'relative')
    this.renderer.appendChild(this.hostElement.nativeElement, this.tooltip)
    this.renderer.setProperty(this.tooltip, 'textContent', this.appTooltip)

    this.renderer.listen(this.hostElement.nativeElement, 'mouseenter', ()=> {
      this.renderer.setStyle(this.tooltip, 'visibility', 'visible')
      this.renderer.setStyle(this.tooltip, 'opacity', '1')
    })

    this.renderer.listen(this.hostElement.nativeElement, 'mouseleave', ()=> {
      this.renderer.setStyle(this.tooltip, 'visibility', 'hidden')
      this.renderer.setStyle(this.tooltip, 'opacity', '0')
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.appTooltip.currentValue !== changes.appTooltip.previousValue && changes.appTooltip.previousValue !== undefined) {
      this.renderer.setProperty(this.tooltip, 'textContent', this.appTooltip)
    }
  }

}
