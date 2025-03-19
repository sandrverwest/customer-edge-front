import {Component, Input} from '@angular/core';

@Component({
  selector: 'equipment-dropdown',
  templateUrl: './equipment-dropdown.component.html',
  styleUrls: ['./equipment-dropdown.component.scss']
})
export class EquipmentDropdownComponent {
  @Input() contractorId: string

  isOpen: boolean = false

  toggle() {
    this.isOpen = !this.isOpen
  }
}
