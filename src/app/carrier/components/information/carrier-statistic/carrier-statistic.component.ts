import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-carrier-statistic',
  templateUrl: './carrier-statistic.component.html',
  styleUrls: ['./carrier-statistic.component.scss']
})
export class CarrierStatisticComponent implements OnInit{
  hiring:number
  hired: {
    today: number,
    thisWeek: number,
    thisMonth: number
  }
  left: {
    today: number,
    thisWeek: number,
    thisMonth: number
  }

  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.parent?.params.subscribe((params:Params) => {
      this.hiring = Math.floor(Math.random() * 2)
      this.hired = {
        today: Math.floor(Math.random() * 2),
        thisWeek: Math.floor(Math.random() * 6),
        thisMonth: Math.floor(Math.random() * 9)
      }
      this.left = {
        today: Math.floor(Math.random() * 2),
        thisWeek: Math.floor(Math.random() * 6),
        thisMonth: Math.floor(Math.random() * 9)
      }
    })
  }
}
