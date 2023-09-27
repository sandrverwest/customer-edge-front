import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../shared/interfaces";
import {UsersService} from "../../../../../shared/services/fetch/users.service";
import {SaverService} from "../../../../../shared/services/saver.service";
import {delay} from "rxjs";
import {SuccessErrorsService} from "../../../../../shared/services/success-errors.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-editing',
  templateUrl: './user-editing.component.html',
  styleUrls: ['../../users.component.scss']
})
export class UserEditingComponent implements OnInit{
  @Input() user:User
  @Output() userEmitter:EventEmitter<User> = new EventEmitter<User>()
  userEditForm: FormGroup

  constructor(private usersService: UsersService, private saverService: SaverService, private errorsService: SuccessErrorsService) {
  }
  ngOnInit() {
    this.userEditForm = new FormGroup({
      first_name: new FormControl(this.user.first_name, Validators.required),
      last_name: new FormControl(this.user.last_name, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      phone: new FormControl(this.user.phone),
      extension: new FormControl(this.user.extension),
      department: new FormControl(this.user.department),
      position: new FormControl(this.user.position)
    })
  }

  saveUserInfo() {
    this.saverService.show()
    this.usersService.updateUser(this.user._id, this.userEditForm.value).subscribe({
      next: result => {
        this.userEmitter.emit(result)
        this.saverService.hide()
        this.errorsService.setSuccess()
      },
      error: error => {
        this.errorsService.setError('Save User', error)
        this.saverService.hide()
      }
    })
  }
}
