import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UserService {
  private userUrl = "https://petmaluapp-api.herokuapp.com/api/v1/users";

  constructor(private router: Router, private http: Http) {}

  getUsers() {
    return this.http.get(this.userUrl)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  registerUser(email: string, password: string, password_confirmation: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.userUrl, {email, password, password_confirmation}, options)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login')
  }

  login(email: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url = "https://petmaluapp-api.herokuapp.com/api/v1/users/login";

    return this.http.post(url, {email, password}, options)
                    .map((res: Response) => {
                      localStorage.setItem("token", res.json().token);
                      if (res.json().status == 'success') {
                        this.router.navigateByUrl('/dashboard');
                      } else {
                        return res.json()
                      }
                    })
                    .catch(this.handleError)
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
