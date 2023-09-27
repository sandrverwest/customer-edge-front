import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../../../../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../../../shared/services/fetch/users.service";
import {SaverService} from "../../../../../shared/services/saver.service";
import {SuccessErrorsService} from "../../../../../shared/services/success-errors.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['../../users.component.scss']
})
export class NewUserComponent {
  @Output() userEmitter:EventEmitter<User> = new EventEmitter<User>()
  newUserForm: FormGroup

  constructor(private usersService: UsersService, private saverService: SaverService, private errorsService: SuccessErrorsService) {
  }
  ngOnInit() {
    this.newUserForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }


  createUser() {
    this.saverService.show()
    this.usersService.createUser(this.newUserForm.value).subscribe({
      next: result => {
        this.newUserForm.reset()
        this.userEmitter.emit(result)
        this.saverService.hide()
        this.errorsService.setSuccess()
      },
      error: error => {
        this.errorsService.setError('Create User', error)
        this.saverService.hide()
      }
    })
  }
}
