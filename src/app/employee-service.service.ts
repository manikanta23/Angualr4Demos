import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IEmployee } from './IEmployee';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
// import { HttpClient } from '@angular/common/http';


@Injectable()
export class EmployeeServiceService {

  constructor(private _http: Http) { }

  //Get Employee information
  getEmployees(): Observable<IEmployee[]> {
    return this._http.get("http://localhost:50803/api/Employee")
      .map((response: Response) => <IEmployee[]>response.json())
      .catch(this.handleError);
  }

  //Get Employee information using code
  getEmployeeByCode(empCode: string): Observable<IEmployee> {
    return this._http.get("http://localhost:50803/api/Employee?code=" + empCode)
      .map((response: Response) => <IEmployee>response.json())
      .catch(this.handleError);
  }

  //Insert Employee information
  // insertEmployee(employee: IEmployee): Observable<boolean> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   return this._http.post("http://localhost:50803/api/Employee", employee, options)
  //     .map((response: Response) => response)
  //     .catch(this.handleError);
  // }

  insertEmployee(employee: IEmployee): Observable<IEmployee> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post("http://localhost:50803/api/Employee", employee, options)
    .map((response: Response) => <IEmployee>response.json())
    .catch(this.handleError);
  }
  //Error Handling 
  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }
}
