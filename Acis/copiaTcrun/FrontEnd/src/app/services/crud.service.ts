import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogService } from './log.service';

@Injectable()
export class CrudService {
  URL: string;
  headers: HttpHeaders;
  models = {
    TASK: "tasks",
    SPRINT: "sprints",
    PROJECT: "projects",
    MEMBER: "members",
    USER_STORY: "user-stories",
    ACCEPTANCE_CRITERIA: "acceptance-criteria",
    MEMBER_TASK: "member-task",
    MEMBER_PROJECT: "member-project",
    PROJECT_TECHNOLOGY: "project-technology",
    LOGS: "logs",
    TECHNOLOGY: "technologies" 
  };

  constructor(private auth: AuthService, private http: HttpClient, private log: LogService) {
    this.URL = 'http://localhost:8000/api';

    if(this.auth.isLoggedIn()){
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.getToken()
      });
    }
    else{
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  list(model: string) {
    return this.http.get(
      this.URL + "/" + model,
      { headers: this.headers }
    );
  }

  retrieve(model: string, id: any) {
    return this.http.get(
      this.URL + "/" + model + "/" + id,
      { headers: this.headers }
    );
  }

  registerMember(body:any) {
    return this.http.post(
      this.URL + "/" + this.models.MEMBER,
      body,
      { headers: this.headers }
    );
  }

  create(model: string, body: any) {
    return this.log.record(model, "CREATE")
    .mergeMap(
        res => this.http.post(
          this.URL + "/" + model,
          body,
          { headers: this.headers }
        )
      );
  }

  update(model: string, id: any, body: any) {
    return this.http.put(
      this.URL + "/" + model + "/" + id,
      body,
      { headers: this.headers }
    ).mergeMap(
        res => this.log.record(model, "UPDATE ID " + id)
      );
  }

  delete(model: string, id: any) {
    return this.http.delete(
      this.URL + "/" + model + "/" + id,
      { headers: this.headers }
    ).mergeMap(
        res => this.log.record(model, "DELETE ID " + id)
      );
  }
}