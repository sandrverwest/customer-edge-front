import {Component, OnInit} from '@angular/core';
import {Contractor} from "../../../../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../../../shared/services/loader.service";

@Component({
  selector: 'app-leaving',
  templateUrl: './leaving-contractor.component.html',
  styleUrls: ['./leaving-contractor.component.scss']
})
export class LeavingContractorComponent implements OnInit{
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
