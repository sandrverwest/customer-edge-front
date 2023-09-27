import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../interfaces";
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  createUser(data:User):Observable<User> {
    return this.http.post<User>(environment.API_URL+ '/users', data)
  }

  getUsers(queryParams:{}):Observable<User[]> {
    let params = new HttpParams()
    Object.keys(queryParams).forEach( (key) => {
      params = params.append(key, queryParams[key as keyof typeof queryParams])
    })
    return this.http.get<User[]>(environment.API_URL+'/users', {
      params
    })
  }

  updateUser(id:string, data:any):Observable<User> {
    return this.http.patch<User>(environment.API_URL+'/users/'+id, data)
  }

  deleteUser(id: string) {
    return this.http.delete<User>(environment.API_URL+'/users/'+id)
  }

}
