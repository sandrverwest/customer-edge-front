import {Component, OnDestroy, OnInit} from '@angular/core';
import { io } from 'socket.io-client';
import {UserService} from "../../../authorization/services/user.service";
import {User} from "../../interfaces";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.scss']
})
export class UsersOnlineComponent implements OnInit, OnDestroy{
  socket: any
  users: User[] = []

  constructor(public user: UserService) { }

  ngOnInit(): void {
    this.socket = io('http://localhost:3000/online')

    this.socket.on('getOnlineUsers', (onlineUsers: User[]) => {
      this.users = onlineUsers
    })

    this.user.userData$.subscribe(user => {
      this.socket.emit('goOnline', user)
    })
  }


  ngOnDestroy() {
    this.user.userData$.subscribe(user => {
      this.socket.emit('goOffline', user)
    })
  }

  protected readonly environment = environment;
}
