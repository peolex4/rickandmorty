import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Characters } from '../models/characters';
import { Episode } from '../models/episode';

const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient
  ) { }

  public getCharacters(page: number): Observable<Characters> {
    const httpParams = {
      params: new HttpParams().set('page', page ? page + 1 : 1)
    };
    return this.http.get<Characters>(URL + '/character/', httpParams);
  }

  public getEpisodesInfo(episodes: string[]): Observable<Episode[]> {
    return this.http.get<Episode[]>(URL + `/episode/${episodes}`);
  }

  public getLocationsInfo(locations: string[]): Observable<Location[]> {
    return this.http.get<Location[]>(URL + `/location/${locations}`);
  }

}
