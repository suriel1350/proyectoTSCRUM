import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../../models/task.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  message: string;

  id: number;
  duration: number;
  name: string;
  completed: string;
  user_story_id: number;

  constructor(private crud:CrudService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.message = "Creation component ready";
    console.log("Update component ready");

    this.id = parseInt(this.route.snapshot.params.id);
    
    //console.log (this.id);

    this.crud.retrieve(this.crud.models.TASK, this.id)
    .subscribe(
      (res:Task) => {
        console.log (res);

        this.duration = res.duration;
        this.name = res.name;
        this.completed = String(res.completed);
        this.user_story_id = res.user_story.id;
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

  updateTask()
  {
    console.log ("Updating task")

    let body = {
      id: this.id,
      duration: this.duration,
      name: this.name,
      completed: this.completed,
      user_story_id: this.user_story_id
    };

    this.crud.update (this.crud.models.TASK, this.id, body)  
    .subscribe (
      (res: Response) => {
        //this.message = "Tarea insertada correctamente";
        console.log("Tarea actualizada correctamente");

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
