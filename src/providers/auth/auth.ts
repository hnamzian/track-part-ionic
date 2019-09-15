import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { environment as env } from '../../config/environment.prod';
import { User } from '../../models/User';

@Injectable()
export class AuthProvider {
  baseUrl = `${env.BASE_URL}/clients`;

  constructor(public http: HttpClient) {}

  async registerUser(user: User) {
    const url = this.baseUrl;

    return this.http
      .post(url, user)
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .pipe(
        map((result: User) => {
          return result;
        })
      );
  }

  async loginUser(email, password) {
    const url = this.baseUrl;

    return this.http
      .post(url, { email, password })
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      )
      .pipe(
        map(result => {
          return result;
        })
      );
  }
}
