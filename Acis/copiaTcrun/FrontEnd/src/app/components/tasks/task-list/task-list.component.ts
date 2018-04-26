  import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../../models/task.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  message: string;
  tasks: Task[];
  public user_story_id: number;

  constructor(private crud:CrudService) { }

  ngOnInit() {

    this.user_story_id = 1;

    this.crud.list(this.crud.models.TASK)
    .subscribe(
      (res:Task[])=>{
        console.log(res);
        this.tasks = res;
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

  deleteTask(id: number){
    console.log("Deleting task")
    this.crud.delete(this.crud.models.TASK, id)
    .subscribe(
      (res:Response) => {
        this.message = "Success";
        let x = 0;
        for(let task of this.tasks){
          if(task.id == id){
            this.tasks.splice(x, 1);
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
