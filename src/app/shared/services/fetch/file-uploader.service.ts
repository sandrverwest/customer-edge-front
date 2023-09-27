import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Carrier, User} from "../../interfaces";
import {SaverService} from "../saver.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(
    private http: HttpClient,
    private saverService: SaverService
  ) { }


  userPhotoUpload(file:File, id:string):Observable<User>{
    const formData = new FormData()
    formData.append('image', file)
    this.saverService.show()

    return this.http.post<User>(environment.API_URL+'/users/upload/'+id, formData)
  }

  carrierLogoUpload(file:File, id:string):Observable<Carrier> {
    const formData = new FormData()
    formData.append('image', file)
    this.saverService.show()

    return this.http.post<Carrier>(environment.API_URL + '/carriers/upload/' + id, formData)
  }

  entityImageUpload(id:string, file:File, entityType:string):Observable<any> {
    const formData = new FormData()
    formData.append('image', file)
    this.saverService.show()

    // entityType can be 'carriers' and 'users' now
    return this.http.post<any>(`${environment.API_URL}/${entityType}/upload/${id}`, formData)
  }

  entityImageDelete(id:string, data:any, entityType:string):Observable<any> {
    return this.http.patch<any>(`${environment.API_URL}/${entityType}/${id}`, data)
  }
}
