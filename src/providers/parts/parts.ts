import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { environment as env } from '../../config/environment.prod';
import { TokenStorage } from '../../storage/token';
import { Part } from '../../models/Part';
import { Token } from '@angular/compiler';

@Injectable()
export class PartsProvider {
  baseUrl = `${env.BASE_URL}/parts`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

  async createPart(part: Part) {
    const url = this.baseUrl;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as Part);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authToken
      })
    };

    return this.http
      .post(url, part, httpOptions)
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .pipe(
        map((result: Part) => {
          return result;
        })
      );
  }

  async getPartByType(partType) {
    const url = this.baseUrl;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as Part);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authToken
      }),
      params: new HttpParams().set('type', partType)
    };

    return this.http
      .get(url, httpOptions)
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .pipe(
        map((result: Part) => {
          return result;
        })
      );
  }
}
