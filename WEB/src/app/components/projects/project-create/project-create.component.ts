import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../models/project';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  project: Project;
  message: string;
  user: User;

  constructor(private ds: DataService, private auth:AuthService)  { }

  ngOnInit() {
    this.project = new Project('', '', '', '', '', '', '', '', '');
    this.message = '';
    this.user = this.auth.getUser();
  }

  validate(): boolean {
    if (this.project.name.length == 0) {
      this.message = "Debe ingresar el nombre del proyecto.";
      return false;
    }

    return true;
  }

  createProject() {
    if (this.validate()) {
      this.ds.createProject(this.project).subscribe(
        (response) => {
          this.message = "Proyecto creado correctamente.";
          console.log(response);
        },
        (error) => {
          var body = JSON.parse(error._body);
          this.message = body.message;
          console.log(error);
        }
      );
    }

    return false;
  }
}
