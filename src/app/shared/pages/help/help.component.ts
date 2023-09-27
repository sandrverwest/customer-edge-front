import { Component, OnInit } from '@angular/core';
import { CarriersService } from 'src/app/shared/services/fetch/carriers.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(public dataCarriers: CarriersService) { }

  ngOnInit(): void {
  }

}
