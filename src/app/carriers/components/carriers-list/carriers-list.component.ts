import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Carrier} from "../../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../shared/services/loader.service";
import {SectionTitleService} from "../../../shared/services/section-title.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-carriers-list',
  templateUrl: './carriers-list.component.html',
  styleUrls: ['./carriers-list.component.scss']
})
export class CarriersListComponent implements OnInit, AfterViewInit{
  carriers: Carrier[] = []
  filtered: Carrier[] = []
  constructor(
  private route: ActivatedRoute,
  private loaderService: LoaderService,
  private sectionTitleService: SectionTitleService
  ) {}

  ngOnInit() {
    this.loaderService.showResolveLoader()
    this.route.data.subscribe(
      ({carriers}) => {
        this.carriers = this.filtered = carriers
        this.loaderService.hideResolveLoader()
      })
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.sectionTitleService.setTitle('Carriers')
    }, 0)
  }

  carrierFilter(event: any) {
    const value = event.target.value

    this.carriers = this.filtered.filter((element:Carrier) => {

      if(element.name?.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1){
        return true
      }

      if(element.usdot?.toString().indexOf(value.toLowerCase().trim()) !== -1){
        return true
      }

      if(element.mc?.toString().indexOf(value.toLowerCase().trim()) !== -1){
        return true
      }

      if(element.divisions) {
        return (element.divisions.map(element => element.toLowerCase()).indexOf(value.toLowerCase().trim()) !== -1)
      }

      if(element.operations) {
        return (element.operations.map(element => element.toLowerCase()).indexOf(value.toLowerCase().trim()) !== -1)
      }

      return false
    })
  }

    protected readonly environment = environment;
}
