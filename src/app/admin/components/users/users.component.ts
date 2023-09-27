import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from "@angular/router";
import {UsersService} from "../../../shared/services/fetch/users.service";
import {User} from "../../../shared/interfaces";
import {SectionTitleService} from "../../../shared/services/section-title.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit{
  users:User[]
  filtered:User[]
  constructor(
    private route: ActivatedRoute,
    private usersService:UsersService,
    private sectionTitleService: SectionTitleService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filter = params['filter'] || null
      this.usersService.getUsers(params).subscribe(result => {
        this.filtered = this.users = result
      })
    })
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.sectionTitleService.setTitle('Users')
    }, 0)
  }


  pushEmitter(data:User) {
    // this.users.push(data)
    this.users.unshift(data)
  }

  deletionEmitter(index: number) {
    this.users.splice(index, 1)
  }

  userSearch(event: any) {
    const value = event.target.value

    this.users = this.filtered.filter((element) => {
      const fullName = `${element.first_name} ${element.last_name}`

      if(fullName.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        return true
      }

      if(element.email) {
        if(element.email.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          return true
        }
      }

      if(element.phone) {
        if(element.phone.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          return true
        }
      }

      if(element.extension) {
        if(element.extension.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          return true
        }
      }

        if(element.department) {
          if(element.department.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
            return true
          }
        }

      if(element.position) {
        if(element.position.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
          return true
        }
      }

      return false
    })
  }
}
