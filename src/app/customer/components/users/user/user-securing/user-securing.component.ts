import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../shared/interfaces";
import {UsersService} from "../../../../../shared/services/fetch/users.service";
import {SuccessErrorsService} from "../../../../../shared/services/success-errors.service";
import {SaverService} from "../../../../../shared/services/saver.service";

@Component({
  selector: 'app-user-securing',
  templateUrl: './user-securing.component.html',
  styleUrls: ['../../users.component.scss']
})
export class UserSecuringComponent {
  @Input() user:User
  @Input() index: number
  @Output() userEmitter:EventEmitter<User> = new EventEmitter<User>()
  @Output() userDeletionEmitter:EventEmitter<number> = new EventEmitter<number>()

  userSecurityForm:FormGroup
  isPasswordUpdated:boolean = false
  constructor(private usersService: UsersService, private saverService: SaverService, private errorsService: SuccessErrorsService) {
  }
  ngOnInit() {
    this.userSecurityForm = new FormGroup({
      password: new FormControl(null, Validators.minLength(6)),
      isDeactivated: new FormControl(this.user.isDeactivated ? this.user.isDeactivated : false)
    })
  }

  saveUserSecurity() {
    this.saverService.show()
    if(this.userSecurityForm.get('password')?.value) {
      this.usersService.updateUser(this.user._id, this.userSecurityForm.value).subscribe({
        next: result => {
          this.userSecurityForm.get('password')?.reset()
          this.userEmitter.emit(result)
          this.saverService.hide()
          this.errorsService.setSuccess()
          this.isPasswordUpdated = true
        },
        error: error => {
          this.errorsService.setError('User Security', error)
          this.saverService.hide()
        }
      })
    } else {
      this.usersService.updateUser(this.user._id, {isDeactivated: this.userSecurityForm.get('isDeactivated')?.value}).subscribe({
        next: result => {
          this.userSecurityForm.get('password')?.reset()
          this.userEmitter.emit(result)
          this.saverService.hide()
          this.errorsService.setSuccess()
        },
        error: error => {
          this.errorsService.setError('User Update', error)
          this.saverService.hide()
        }
      })
    }
  }

  deleteUser(){
    const confirmed = confirm(`Are you sure you want to completely delete ${this.user.firstName} ${this.user.lastName}'s account? The account cannot be restored.`)
    if (confirmed) {
      this.saverService.show()
      this.usersService.deleteUser(this.user._id).subscribe({
        next: result => {
          this.userDeletionEmitter.emit(this.index)
          this.saverService.hide()
          this.errorsService.setSuccess()
        },
        error: error => {
          this.errorsService.setError('User Delete', error)
          this.saverService.hide()
        }
      })
    }
  }
}
