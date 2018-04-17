import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  message: string;

  duration: number;
  name: string;
  completed: string;
  user_story_id: number;

  constructor(private crud:CrudService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.message = "Creation component ready";
    console.log("Creation component ready");

    this.duration = 0;
    this.name = "";
    this.completed = "false";

    this.user_story_id = this.route.snapshot.params.user_story_id;
  }

  createTask()
  {
    console.log ("Creating task")

    let body = {
      id: null,
      duration: this.duration,
      name: this.name,
      completed: this.completed,
      user_story_id: this.user_story_id
    };

    this.crud.create (this.crud.models.TASK, body)  
    .subscribe (
      (res: Response) => {
        //this.message = "Tarea insertada correctamente";
        console.log("Tarea insertada correctamente");
        this.router.navigate(['tasks']);
      },
      (err:HttpErrorResponse) => {
        if(err.error){
          this.message = err.error.message;
        }
        else{
          this.message = err.error.errors[0].message;
        }
      }
    );
  }
}
