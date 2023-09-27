import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SocketService} from "../../services/socket.service";
import {EntityService} from "../../services/entity.service";
import {Contractor} from "../../../../../shared/interfaces";
import {SuccessErrorsService} from "../../../../../shared/services/success-errors.service";

@Component({
  selector: 'add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent implements OnInit{
  @Input() cid:string
  form: FormGroup
  constructor(
    private socketService:SocketService,
    private entityService:EntityService,
    private successErrorsService: SuccessErrorsService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      business_name: new FormControl(null),
      ssn_ein: new FormControl(null, Validators.required),
    })
  }

  addNewEntity() {
    if(this.form.valid){
      this.entityService.addEntity(this.cid, {...this.form.value, cid:this.cid}).subscribe({
        next: result => {
          console.log(result)
          this.socketService.sendEntity(this.cid, result)
        },
        error: error => {
          this.successErrorsService.setError('New Entity', error)
        }
      })
    }
  }
}
