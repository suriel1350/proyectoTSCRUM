import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { Technology } from '../../../models/technology.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-technology',
  templateUrl: './project-technology.component.html',
  styleUrls: ['./project-technology.component.css']
})
export class ProjectTechnologyComponent implements OnInit {
  message:string;
  project: Project;
  projectTechnologies: Technology[];
  technologies: Technology[];
  technology_id: number;
  version: string;
  
  constructor(private auth:AuthService, private crud:CrudService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.message = '';
    this.version = '';
    let id = this.route.snapshot.params.id;
    this.getProjectTechnologies(id);
    this.getAllTechnologies();
  }

  getAllTechnologies(){
    this.crud.list(this.crud.models.TECHNOLOGY)
    .subscribe(
      (res:Technology[]) => {
        console.log(res);
        this.technologies = res;
      },
      (err:HttpErrorResponse) => {
        if(err.error){
          this.message = err.error.message;
        }
        else{
          this.message = err.error.errors[0].message;
        }
      } 
    )
  }

  getProjectTechnologies(id:number){
    this.crud.retrieve(this.crud.models.PROJECT, id)
    .subscribe(
      (res:Project) => {
        console.log(res);
        this.project = res;
        this.projectTechnologies = res.technologies;
        console.log(this.projectTechnologies);
      },
      (err:HttpErrorResponse) => {
        if(err.error){
          this.message = err.error.message;
        }
        else{
          this.message = err.error.errors[0].message;
        }
      } 
    )
  }

  addTechnology(){  
    if(this.validate()){
      let body = {
        technology_id: this.technology_id,
        project_id: this.project.id,
        version: this.version
      };

      this.crud.create(this.crud.models.PROJECT_TECHNOLOGY, body)
      .subscribe(
        res => {
          this.version = '';
          this.getProjectTechnologies(this.project.id);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if(err.error){
            this.message = err.error.message;
          }
          else{
            this.message = err.error.errors[0].message;
          }
        }
      )
    }
    
    return false;
  }

  validate(){
    if(!this.version || !this.technology_id){
      this.message = "Debes escoger una tecnología y especificar una versión.";
      return false;
    }

    return true;
  }

  deleteTechnology(id:number){
    this.crud.delete(this.crud.models.PROJECT_TECHNOLOGY, id)
    .subscribe(
      res => {
        this.getProjectTechnologies(this.project.id);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        if(err.message){
          this.message = err.message;
        }
        else if(err.error){
          this.message = err.error.message;
        }
        else{
          this.message = err.error.errors[0].message;
        }
      }
    )
  }
}
