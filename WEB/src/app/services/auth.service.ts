import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private url:string;
  public user: User;
  public token;
  
  constructor(private http:Http) { 
    this.url = 'http://localhost:3977/api/';
  }

  login(user, gethash = null){
    
    if(gethash != null){
      user.gethash = gethash;
    }

    let params = JSON.stringify(user);
    let headers = new Headers({'Content-Type':'application/json'});

    return this.http.post(this.url+'login', params, {headers: headers}).map(res => res.json());
  }

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));

    if(user != "undefined"){
      this.user = user;
    }
    else{
      this.user = null;
    }

    return this.user;
  } 

  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }
    else{
      this.token = null;
    }

    return this.token;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
  }
}
