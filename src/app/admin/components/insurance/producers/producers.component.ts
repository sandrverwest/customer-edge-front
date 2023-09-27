import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProducersService} from "../../../../shared/services/fetch/producers.service";
import {Producer} from "../../../../shared/interfaces";
import {SectionTitleService} from "../../../../shared/services/section-title.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.scss']
})
export class ProducersComponent implements OnInit, AfterViewInit {
  producers: Producer[]
  constructor(private producersService: ProducersService, private sectionTitleService: SectionTitleService) {
  }

  ngOnInit() {
    this.producersService.getProducers().subscribe(producers => {
      this.producers = producers
    })
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.sectionTitleService.setTitle('Producers')
    }, 0)
  }

  pushNewProducer(data: Producer) {
    this.producers.push(data)
  }

  deleteProducer(arrayIndex: number) {
    this.producers.splice(arrayIndex, 1)
  }
}
