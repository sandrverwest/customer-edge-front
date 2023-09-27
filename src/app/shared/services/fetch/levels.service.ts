import {inject, Injectable} from '@angular/core';
import {delay, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {levelGuideline} from "../../interfaces";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {LoaderService} from "../loader.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http: HttpClient) { }

  newLevel(level:levelGuideline):Observable<levelGuideline>{
    return this.http.post<levelGuideline>(`${environment.API_URL}/levels/`, level)
  }

  getLevel(level:string):Observable<levelGuideline>{
    return this.http.get<levelGuideline>(`${environment.API_URL}/levels/${level}`)
  }

  getAllLevels():Observable<levelGuideline[]>{
    return this.http.get<levelGuideline[]>(`${environment.API_URL}/levels/`)
  }

  updateLevel(id:string, level:levelGuideline):Observable<levelGuideline>{
    return this.http.patch<levelGuideline>(`${environment.API_URL}/levels/${id}`, level)
  }

  deleteLevel(id:string):Observable<levelGuideline>{
    return this.http.delete<levelGuideline>(`${environment.API_URL}/levels/${id}`)
  }
}

export const levelResolver: ResolveFn<levelGuideline> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    inject(LoaderService).showResolveLoader()
    return inject(LevelsService).getLevel(route.params.id!).pipe(
      // delay(3000)
    )
  }
