import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface UserDetails{
  _id:string;
  email:string;
  username:string;
  exp:number;
  iat:number
}

export interface TokenPayload{
  email:string;
  password:string;
  username?:string; 
}

interface TokenResponse{
  token:string;
}

@Injectable()
export class AuthService {
  // propiedades
  private token:string;

  // uri
  // private uri:string = "/";
  private uri:string = "http://localhost:3600/";

  constructor(private http:HttpClient, private router:Router) { }

  // metodos
  private saveToken(token:string):void{
    localStorage.setItem('token',token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public testUsername(username:string):Observable<any>{
    // return this.http.post('http://localhost:3000/api/testUsername',{username});
    return this.http.post(this.uri+'testUsername',{username});
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      // base = this._http.post(`/api/${type}`, user);
      base = this.http.post(`${this.uri}${type}`,user);
      // base = this.http.post(`/api/${type}`,user);
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  // public profile(): Observable<any> {
  //   return this.request('get', 'profile');
  // }

  public logout(): void {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
