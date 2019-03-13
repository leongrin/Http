import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  // This header and Params are just an example. They are not necessary, and might generate errors.
  allowOriginHeader = new HttpHeaders().set('key', 'Access-Control-Allow-Origin');
  exampleParams = new HttpParams().set('auth', 'test token').append('more', 'test value');

  constructor(private http: HttpClient) { }

  storeServers(servers: any[]) {
    return this.http.put(
      'https://udemy-ng-http-dc6f2.firebaseio.com/data.json',
      servers,
      {
        headers: this.allowOriginHeader,
        /*params: this.exampleParams*/
      });
}

  getServers() {
    return this.http.get<any[]>('https://udemy-ng-http-dc6f2.firebaseio.com/data.json', {
      headers: this.allowOriginHeader
    })
      .pipe(map(
      (response) => {
        for (const item of response) {
          item.name = 'Change: ' + item.name;
        }
        return response;
      }))
      .pipe(catchError(error => {
      console.log(error);
      return throwError('Something went VERY VERY wrong');
    }));
  }

}


