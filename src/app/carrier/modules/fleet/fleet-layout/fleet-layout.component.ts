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


  trucks: Equipment[] = []

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
