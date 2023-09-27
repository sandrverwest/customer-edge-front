import { Component } from '@angular/core';
import {SuccessErrorsService} from "../../../services/success-errors.service";

@Component({
  selector: 'error-bar',
  templateUrl: './error-bar.component.html',
  styleUrls: ['./error-bar.component.scss']
})
export class ErrorBarComponent {
  constructor(public successErrorsService:SuccessErrorsService) {
  }
}
