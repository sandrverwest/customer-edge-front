import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, UrlSegment} from "@angular/router";
import {levelGuideline} from "../../../../shared/interfaces";
import {LevelsService} from "../../../../shared/services/fetch/levels.service";
import {SectionTitleService} from "../../../../shared/services/section-title.service";

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit, AfterViewInit{
  levels: levelGuideline[]
  isNewMode: boolean = false
  constructor(private levelsService: LevelsService, private sectionTitleService: SectionTitleService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.levelsService.getAllLevels().subscribe(levels => {
      this.levels = levels
    })

    this.route.fragment.subscribe(result => {
      if(result === 'new') {
        this.isNewMode = true
      } else {
        this.isNewMode = false
      }
      console.log('res', result)
    })
  }

  levelsOnPush(level:levelGuideline){
    this.levels.push(level)
  }

  deleteLevel(level:levelGuideline) {
    const confirmed = confirm(`Are you sure you would like to delete Level ${level.level}?`)
    if(confirmed) {
      this.levelsService.deleteLevel(level._id).subscribe({
        next: result => {
          console.log(result)
        },
        error: error=> {
          console.log(error)
        }
      })
    }
  }
  ngAfterViewInit() {
    setTimeout(()=> {
      this.sectionTitleService.setTitle('Levels')
    }, 0)
  }
}
