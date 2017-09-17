import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()

export class ServersService {
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    const header = new Headers({'content-type': 'application/json'});
    // return this.http.post('https://udemy-ng-http-c17a9.firebaseio.com/data.json', servers, {headers: header});
    return this.http.put('https://udemy-ng-http-c17a9.firebaseio.com/data.json', servers, {headers: header});
  }

  getServers() {
    return this.http.get('https://udemy-ng-http-c17a9.firebaseio.com/data')
    .map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'Fetched_' + server.name;
        }
        return data;
      }
    ).catch(
      (error: Response) => {
        console.log(error);
        return Observable.throw('Something went wrong');
      }
    );
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-c17a9.firebaseio.com/appName.json').map(
      (response: Response) => {
        return response.json();
      }
    );
  }
}
