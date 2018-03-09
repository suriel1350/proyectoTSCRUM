import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private url:string;
  public identidad;
  public token;
  
  constructor(private http:Http) { 
    this.url = 'http://localhost:3977/api/';
  }

  login(user_to_login, gethash = null){
    
    if(gethash != null){
      user_to_login.gethash = gethash;
    }

    let json = JSON.stringify(user_to_login);
    let params = json;

    let headers = new Headers({'Content-Type':'application/json'});    

    return this.http.post(this.url+'login', params, {headers: headers}).map(res => res.json());
        /*(response: Response) => {
            let result = response.json();
            if (result.token) {
                // store jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify({token: result.token}));
                return true;
            } else {
                return false;
            }
        });*/
  }

  conseguirIdentidad(){
    let identidad = JSON.parse(localStorage.getItem('identidad'));

    if(identidad != "undefined"){
      this.identidad = identidad;
    }else{
      this.identidad = null;
    }

    return this.identidad;
  } 

  conseguirToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  logout(): void {
      localStorage.removeItem('token');
  }
}
