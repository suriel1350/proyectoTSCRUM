import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from './auth.service';
import { Project } from '../models/project';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class DataService {
  private url:string;
  private token: string;

  constructor(private http:Http, auth: AuthService) { 
    this.url = 'http://localhost:3977/api/';
    this.token = auth.getToken();
  }

  createProject(project: Project){
    let params = {
      nombre: project.name,
      fecha_inicio: project.start,
      fecha_final: project.end,
      descripcion: project.description,
      background: project.background,
      risk: project.risk,
      vision: project.vision,	
      scope: project.scope,	
      tecnologias: project.technologies
    };

    let headers = new Headers({'Content-Type':'application/json', 'Authorization': this.token});

    return this.http.post(this.url + 'proyecto', JSON.stringify(params), {headers: headers}).map(res => res.json());
  }
}
