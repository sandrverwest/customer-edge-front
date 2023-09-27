import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CarrierSidebarService} from "../../../carrier/services/carrier-sidebar.service";
import {Observable} from "rxjs";
import {Carrier} from "../../interfaces";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit{
  isCarrierData$: Observable<Carrier | null>

  constructor(private carrierSidebarService:CarrierSidebarService) {
  }


  ngOnInit() {
    // setTimeout(()=> {
    //   this.isCarrierData$ = this.carrierSidebarService.isCarrierData$
    // }, 0)
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.isCarrierData$ = this.carrierSidebarService.isCarrierData$
    }, 0)
  }
}
