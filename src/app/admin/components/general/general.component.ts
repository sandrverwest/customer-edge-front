import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {levelGuideline} from "../../../shared/interfaces";
import {LevelsService} from "../../../shared/services/fetch/levels.service";
import {SectionTitleService} from "../../../shared/services/section-title.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit{

  constructor() {
  }
  ngOnInit() {
  }
}
