import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { Member } from '../../../models/member.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  message: string;
  project: Project;
  members: Member[];

  constructor(private crud:CrudService, private router:Router) { }

  ngOnInit() {
    this.crud.list(this.crud.models.MEMBER)
    .subscribe(
      (res:Member[])=>{
        console.log(res);
        this.members = res;
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
    this.project = new Project('','',null,null, '', '', '', '');
  }

  createProject(){
    if(this.validate()){
      this.crud.create(this.crud.models.PROJECT, this.project)
      .subscribe(
        (res:Project)=>{
          console.log(res);
          this.project = res;
          this.router.navigate(['projects']);
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

  validate(){
    if(!this.project.vision && !this.project.name && !this.project.begin_date && !this.project.end_date && !this.project.background && !this.project.risks && !this.project.reach && !this.project.scrum_master_id){
      this.message = 'Debes introducir todos los campos';
      return false;
    }
    else{
      this.message = null;
      return true;
    }
  }
}
