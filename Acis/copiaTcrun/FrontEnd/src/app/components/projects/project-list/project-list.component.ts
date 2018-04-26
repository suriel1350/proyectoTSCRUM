import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  message: string;
  projects: Project[];

  constructor(private crud:CrudService, private router:Router, private auth:AuthService) { }

  ngOnInit() {
    if(this.auth.isRoot()){
      this.getAllProjects();
    }
    else{
      this.getMemberProjects();
    }
    
  }

  getAllProjects(){
    this.crud.list(this.crud.models.PROJECT)
    .subscribe(
      (res:Project[])=>{
        console.log(res);
        this.projects = res;
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

  getMemberProjects(){
    this.crud.retrieve(this.crud.models.MEMBER, this.auth.getMember().id)
    .subscribe(
      (res:Member)=>{
        console.log(res.projects);
        this.projects = res.projects;
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

  createProject(){
    this.router.navigate(['projects/create']);
  }

  updateProject(updateID: number){
    this.router.navigate(['projects/update/'+updateID]);
  }

  retrieveProject(retrieveID: number){
    this.router.navigate(['projects/'+retrieveID]);
  }

  deleteProject(id: number){
    console.log("Deleting")
    this.crud.delete(this.crud.models.PROJECT, id)
    .subscribe(
      (res:Response) => {
        this.message = "Succes";
        let x = 0;
        for(let project of this.projects){
          if(project.id == id){

            this.projects.splice(x, 1);
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
}
