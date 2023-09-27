import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {Observable} from "rxjs";
import {Contractor, User} from "../../../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:3000/fleet'); // Replace with your server URL
  }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  leaveRoom(room: string) {
    this.socket.emit('leaveRoom', room);
  }

  sendEntity(room: string, data: Contractor) {
    this.socket.emit('sendEntity', { room, data });
  }

  getMessage() {
    return new Observable<Contractor>((observer) => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  getAllEntities() {
    return new Observable<Contractor[]>((observer) => {
      this.socket.on('fetchData', (entities) => {
        observer.next(entities)
      })
    })
  }

  getError() {
    return new Observable<string>((observer) => {
      this.socket.on('error', (error) => {
        observer.next(error)
      })
    })
  }

}
