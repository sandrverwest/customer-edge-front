import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Producer} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProducersService {

  constructor(private http: HttpClient) { }

  newProducer(producer:Producer):Observable<Producer>{
    return this.http.post<Producer>(`http://localhost:3000/api/producers/`, producer)
  }

  getProducer(id:string):Observable<Producer>{
    return this.http.get<Producer>(`http://localhost:3000/api/producers/${id}`)
  }

  getProducers():Observable<Producer[]>{
    return this.http.get<Producer[]>(`http://localhost:3000/api/producers/`)
  }

  updateProducer(id:string, producer:Producer):Observable<Producer>{
    return this.http.patch<Producer>(`http://localhost:3000/api/producers/${id}`, producer)
  }

  deleteProducer(id:string):Observable<Producer>{
    return this.http.delete<Producer>(`http://localhost:3000/api/producers/${id}`)
  }
}
