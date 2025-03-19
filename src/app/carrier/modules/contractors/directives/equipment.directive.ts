import {Directive, ElementRef, Input, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {Contractor} from "../../../../shared/interfaces";
import {EquipmentComponent} from "../modals/equipment/equipment.component";

@Directive({
  selector: '[appEquipment]'
})
export class EquipmentDirective implements OnInit{
  @Input() appEquipment:{contractor:Contractor, index:number}

  svgElement:HTMLElement = this.renderer.createElement('span')

  isClicked: boolean = false
  constructor(
    private hostElement: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.svgElement.innerHTML = '<svg viewBox="0 0 24 24" class="caret-down-eq"><path d="M6.41,9H17.59a1,1,0,0,1,.7,1.71l-5.58,5.58a1,1,0,0,1-1.42,0L5.71,10.71A1,1,0,0,1,6.41,9Z"/></svg>'

    console.log('svg', this.svgElement)
    console.log(this.hostElement.nativeElement.firstChild, this.hostElement.nativeElement.firstElementChild)

    this.renderer.listen(this.hostElement.nativeElement, 'mouseenter', ()=>{
      console.log('mouse enter')
      this.renderer.setProperty(this.hostElement.nativeElement.firstElementChild, 'innerHTML', this.svgElement.innerHTML)
    })

    this.renderer.listen(this.hostElement.nativeElement, 'mouseleave', ()=>{
      console.log('mouse leave')
      this.renderer.setProperty(this.hostElement.nativeElement.firstElementChild, 'textContent', this.appEquipment.index+1)
    })

      this.renderer.listen(this.hostElement.nativeElement.firstElementChild, 'click', (event:Event)=>{
        this.isClicked = !this.isClicked

        console.log('click works', this.isClicked)
        console.log('event', event.target)


        if(this.isClicked) {
          this.renderer.addClass(this.hostElement.nativeElement, 'active-contractor')
          this.viewContainerRef.clear()
          const component = this.viewContainerRef.createComponent(EquipmentComponent)
          component.instance.contractor  = this.appEquipment.contractor
          component.instance.close.subscribe(()=>{
            this.viewContainerRef.clear()
          })
        } else {
          this.renderer.removeClass(this.hostElement.nativeElement, 'active-contractor')
          this.viewContainerRef.clear()
        }
      })

  }
}
