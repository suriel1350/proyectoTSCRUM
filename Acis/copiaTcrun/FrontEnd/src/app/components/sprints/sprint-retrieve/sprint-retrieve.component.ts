import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { Sprint } from '../../../models/sprint.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sprint-retrieve',
  templateUrl: './sprint-retrieve.component.html',
  styleUrls: ['./sprint-retrieve.component.css']
})
export class SprintRetrieveComponent implements OnInit {

  message: string;
  sprint: Sprint;
  id: number;
  
  constructor(private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.sprint = new Sprint(null, null, null, null, null, null);
    this.sprint.project = new Project(null, null, null, null, null, null, null, null);
    this.message = "";

    this.id = parseInt(this.route.snapshot.paramMap.get("id"));

    this.crud.retrieve(this.crud.models.SPRINT, this.id)
    .subscribe(
      (res:Sprint)=>{
        console.log(res);
        this.sprint = res;
        console.log(this.sprint.project);
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
