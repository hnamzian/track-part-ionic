import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { map, catchError } from "rxjs/operators";
import { environment as env } from "../../config/environment.prod";

@Injectable()
export class PartsProvider {
  baseUrl = `${env.BASE_URL}/parts`;

  constructor(public http: HttpClient) {}

}