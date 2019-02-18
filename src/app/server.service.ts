import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
/*    return this.http.post(
      'https://udemy-ng-http-dc6f2.firebaseio.com/data.json',
      servers,
      {headers: headers});*/
    return this.http.put(
      'https://udemy-ng-http-dc6f2.firebaseio.com/data.json',
      servers,
      {headers: headers});
}

  getServers() {
    return this.http.get('https://udemy-ng-http-dc6f2.firebaseio.com/data').pipe(map(
      (response) => {
        const data = response.json();
        return data;
      }
    ))
      .pipe(catchError(error => {
      console.log(error);
      return throwError('Something went wrong');
    }));
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-dc6f2.firebaseio.com/appName.json').pipe(map(
      response => response.json()
    ));
  }

}


