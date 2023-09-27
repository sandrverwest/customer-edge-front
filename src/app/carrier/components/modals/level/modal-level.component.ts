import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {levelGuideline} from "../../../../shared/interfaces";


@Component({
  selector: 'app-level',
  templateUrl: './modal-level.component.html',
  styleUrls: ['./modal-level.component.scss', '../../../../admin/components/insurance/levels/levels.component.scss']
})
export class ModalLevelComponent {
  @Output() close = new EventEmitter<void>()
  data: levelGuideline

}
