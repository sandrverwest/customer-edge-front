import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../../../shared/services/loader.service";
import {Contractor} from "../../../../../shared/interfaces";

@Component({
  selector: 'app-hiring',
  templateUrl: './hiring-contractor.component.html',
  styleUrls: ['./hiring-contractor.component.scss']
})
export class HiringContractorComponent implements OnInit{

  contractors: Contractor[] = []

  constructor(
    private route: ActivatedRoute,
    private loaderService:LoaderService,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      ({contractors}) => {
        this.contractors = contractors
        this.loaderService.hideResolveLoader()
      })
  }
}
