import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Route} from "@angular/router";
import {SectionTitleService} from "../../shared/services/section-title.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit, AfterViewInit {
  title$: Observable<string | null>
  constructor(private sectionTitleService: SectionTitleService) {
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.title$ = this.sectionTitleService.title$
    }, 0)
  }
}
