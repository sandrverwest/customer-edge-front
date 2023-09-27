import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarriersService } from 'src/app/shared/services/fetch/carriers.service';
import {Carrier} from "../../interfaces";

@Component({
  selector: 'left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  isExpandedStorage: boolean
  isExpanded: boolean = false
  isLoading: boolean = false

  byNameDESC = true
  carriers:Carrier[] = []
  filtered:Carrier[] = []
  constructor(private carriersService: CarriersService, private http: HttpClient ) {}

  ngOnInit(): void {
    this.isExpandedStorage = !!localStorage.getItem('isExpanded')
    if(this.isExpandedStorage) {
      this.isExpanded = true
    } else {
      this.isExpanded = false
    }
    this.isLoading = true
    this.carriersService.getCarriersMenu().subscribe({
      next: carriers => {
        this.filtered = this.carriers = carriers
        this.isLoading = false
      },
      error: error => {
        this.isLoading = false
      }
    })
  }

  moreLess() {
    this.isExpanded = !this.isExpanded
    if(this.isExpanded) {
      localStorage.setItem('isExpanded', 'true');
    }
    if(!this.isExpanded) {
      localStorage.removeItem('isExpanded')
    }

  }







  byName () {
    this.byNameDESC = !this.byNameDESC
    if(this.byNameDESC) {
      this.filtered = this.carriers.sort((a, b) => a.name!.localeCompare(b.name!))
    }

    if(!this.byNameDESC) {
      this.filtered = this.carriers.sort((a, b) => b.name!.localeCompare(a.name!))
    }
  }

  byValue($event:any) {
    const value = $event.target.value
    this.filtered = this.carriers.filter((el) => el.name!.toLowerCase().indexOf(value.toLowerCase()) !== -1)
  }

}
