import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { Member } from '../../../models/member.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {

  message: string;
  project: Project;
  members: Member[];
  id: number;
  begin_date: string;
  end_date: string;

  constructor(private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  
  ngOnInit() {
    this.project =  new Project(null, null, null, null, null, null, null, null);
    this.begin_date = "";
    this.end_date = "";
    this.message = "";

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.crud.list(this.crud.models.MEMBER)
    .subscribe(
      (res:Member[])=>{
        console.log(res);
        this.members = res;
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

    this.crud.retrieve(this.crud.models.PROJECT, this.id)
    .subscribe(
      (res:Project)=>{
        console.log(res);
        this.project = res;
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

  updateProject(){
    if(this.validate()){
      this.crud.update(this.crud.models.PROJECT, this.id, this.project)
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
