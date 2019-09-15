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

  async deliverPart(partId, receiver) {
    const url = `this.baseUrl/${partId}/deliver`;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as Part);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authToken
      })
    };

    const data = {
      to: receiver
    };

    return this.http
      .post(url, data, httpOptions)
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

  async confirmDelivery(partId, sender) {
    const url = `this.baseUrl/${partId}/confirmDelivery`;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as Part);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authToken
      })
    };

    const data = {
      from: sender
    };

    return this.http
      .post(url, data, httpOptions)
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

  async cancelDelivery(partId, sender) {
    const url = `this.baseUrl/${partId}/cancelDelivery`;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as Part);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authToken
      })
    };

    const data = {
      from: sender
    };

    return this.http
      .post(url, data, httpOptions)
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

  async addSubPart(partId, subPartId) {
    const url = `this.baseUrl/${partId}/subParts`;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as Part);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authToken
      })
    };

    const data = {
      subPartId
    };

    return this.http
      .post(url, data, httpOptions)
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

  async removeSubPart(partId, subPartId) {
    const url = `this.baseUrl/${partId}/subParts/${subPartId}`;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as Part);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authToken
      })
    };

    return this.http
      .delete(url, httpOptions)
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

  async getSubParts(partId) {
    const url = `this.baseUrl/${partId}/subParts`;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as Part);

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authToken
      })
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
