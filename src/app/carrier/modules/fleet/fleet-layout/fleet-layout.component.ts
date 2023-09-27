import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from "../services/socket.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Contractor, Equipment} from "../../../../shared/interfaces";
import {SuccessErrorsService} from "../../../../shared/services/success-errors.service";
import {EntityService} from "../services/entity.service";

@Component({
  selector: 'app-fleet-layout',
  templateUrl: './fleet-layout.component.html',
  styleUrls: ['./fleet-layout.component.scss']
})
export class FleetLayoutComponent implements OnInit, OnDestroy{
  paramsSubscription$:Subscription | undefined
  cid:string
  equipment: Equipment[] = []


  trucks: Equipment[] = [
    {
      contractor: 'Ivan Shykal',
      equipmentType: 'TRUCK',
      ownership: 'OWNN',
      unitNumber: '3546',
      vin: '3AKJGLDV8HSHY7779',
      year: 2017,
      make: 'FRHT',
      value: 70000,
      cl: false,
      pd: true,
      ntl: true,
    },
    {
      contractor: 'Ivan Shykal',
      equipmentType: 'TRUCK',
      ownership: 'OWNN',
      unitNumber: '3768',
      vin: '4V4NC9EH6FN187342',
      year: 2015,
      make: 'VOLV',
      value: 40000,
      cl: true,
      pd: true,
      ntl: true,
    },
    {
      equipmentType: 'TRUCK',
      ownership: 'LP',
      unitNumber: '1748',
      vin: '3AKJGLDR8HSHD9455',
      year: 2017,
      make: 'FRHT',
      value: 80000,
      cl: true,
      pd: true,
      ntl: true,
    },
    {
      contractor: 'John Dou',
      equipmentType: 'TRUCK',
      ownership: 'OWNN',
      unitNumber: '3768',
      vin: '4V4NC9EH6FN187342',
      year: 2015,
      make: 'VOLV',
      value: 40000,
      cl: true,
      pd: true,
      ntl: true,
    },
  ]

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private successErrorsService: SuccessErrorsService,
    private entityService:EntityService
  ) {}


  ngOnInit() {
    this.paramsSubscription$ = this.route.parent?.parent?.params.subscribe(params=> {
      this.cid = params.id
      this.socketService.joinRoom(params.id)

    })

    this.socketService.getMessage().subscribe((entity: Contractor) => {
      // this.entities.push(entity)
    })

  }

  ngOnDestroy() {
    this.paramsSubscription$?.unsubscribe()
    this.socketService.leaveRoom(this.cid);
  }
}
