import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IResponse } from "../dashboard/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getWeatherData(): Observable<IResponse> {
    return this.http.get('https://siversky.rychagov.me/ajax.php') as Observable<IResponse>;
  }
}
