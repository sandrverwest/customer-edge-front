import {Component, Input} from '@angular/core';
import {SuccessErrorsService} from "../../../services/success-errors.service";

@Component({
  selector: 'button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.scss']
})
export class ButtonLoaderComponent {
  constructor(
    public successErrorsService:SuccessErrorsService
  ) {
  }
}
