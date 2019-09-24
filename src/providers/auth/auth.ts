import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { environment as env } from '../../config/environment.prod';
import { TokenStorage } from '../../storage/token';
import { User } from '../../models/User';

@Injectable()
export class AuthProvider {
  baseUrl = `${env.BASE_URL}/clients`;

  constructor(public http: HttpClient, public tokenStorage: TokenStorage) {}

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
    const url = `${this.baseUrl}/login`;

    return this.http.post(url, { email, password }).pipe(
      map(result => {
        return result;
      })
    );
  }

  async getUserProfile() {
    const url = `${this.baseUrl}/me`;

    const authToken = await this.tokenStorage.getAuthToken();

    if (!authToken) return Observable.of({} as User);

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
      .pipe(map((result: User) => result));
  }
}
