import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Route} from "@angular/router";
import {SectionTitleService} from "../../shared/services/section-title.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
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
