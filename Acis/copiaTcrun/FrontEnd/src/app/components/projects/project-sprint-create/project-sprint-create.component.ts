import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { Sprint } from '../../../models/sprint.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-sprint-create',
  templateUrl: './project-sprint-create.component.html',
  styleUrls: ['./project-sprint-create.component.css']
})
export class ProjectSprintCreateComponent implements OnInit {

  message: string;
  project: Project;
  psprints: Sprint[];
  sprint: Sprint;
  projectID: number;

  constructor(private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.message = '';
    this.project =  new Project(null, null, null, null, null, null, null, null, null, null, null, null);
    this.psprints = null;
    this.projectID = parseInt(this.route.snapshot.paramMap.get("id"));
    this.sprint = new Sprint(null, null, null, null, this.projectID);
    this.crud.retrieve(this.crud.models.PROJECT, this.projectID)
    .subscribe(
      (res:Project)=>{
        console.log(res);
        this.project = res;
        this.psprints = this.project.sprints;
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

  createSprint(){
    if(this.validate()){
      this.crud.create(this.crud.models.SPRINT, this.sprint)
      .subscribe(
        (res:Sprint)=>{
          console.log(res);
          this.sprint = res;
          this.router.navigate(['projects/retrieve/'+this.projectID]);
          this.psprints.push(this.sprint);
        },
        (err:HttpErrorResponse) => {
          if(err.error){
            this.message = err.error.message
            
          }
          else{
            this.message = err.error.errors[0].message;
          }
        }
      )
      
    }
  }

  deleteSprint(sprintID: number){
    console.log("Deleting")
    this.crud.delete(this.crud.models.SPRINT, sprintID)
    .subscribe(
      (res:Response) => {
        this.message = "Succes";
        let x = 0;
        for(let psprint of this.psprints){
          if(psprint.id == sprintID){

            this.psprints.splice(x, 1);
          }
          x++;
        }
      },
      (err:HttpErrorResponse) => {
        if(err.error){
          this.message = err.error.message
        }
        else{
          this.message = err.error.errors[0].message;
        }
      }
    )
  }

  validate(){
    if(!this.sprint.days && !this.sprint.comment && !this.sprint.project_id ){
      this.message = 'Debes introducir todos los campos';
      return false;
    }
    else{
      this.message = null;
      return true;
    }
  }
}
