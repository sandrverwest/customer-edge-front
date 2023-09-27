import {Component, Input} from '@angular/core';

@Component({
  selector: 'new-contractor-card',
  templateUrl: './new-contractor-card.component.html',
  styleUrls: ['./new-contractor-card.component.scss']
})
export class NewContractorCardComponent {
  @Input() contractorType:string
  @Input() isActive: boolean
}
