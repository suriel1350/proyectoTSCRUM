import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { Member } from '../../../models/member.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-retrieve',
  templateUrl: './project-retrieve.component.html',
  styleUrls: ['./project-retrieve.component.css']
})
export class ProjectRetrieveComponent implements OnInit {

  message: string;
  project: Project;
  id: number;

  constructor(private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.project =  new Project(null, null, null, null, null, null, null, null, null);
    this.project.scrum_master = new Member(null, null, null, null, null, null, null);
    this.message = "";

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.crud.retrieve(this.crud.models.PROJECT, this.id)
    .subscribe(
      (res:Project)=>{
        console.log(res);
        this.project = res;
        console.log(this.project.scrum_master)
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

}
