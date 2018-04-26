import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-story-create',
  templateUrl: './user-story-create.component.html',
  styleUrls: ['./user-story-create.component.css']
})
export class UserStoryCreateComponent implements OnInit {

  message: string;

  weight: number;
  scrum_board_status: number;
  description: string;
  priority: number;
  sprint_id: number;

  constructor(private crud:CrudService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    console.log("Creation component ready");

    this.weight = 0;
    this.scrum_board_status = 0;
    this.description = '';
    this.priority = 0;
    this.sprint_id = this.route.snapshot.params.sprint_id;
  }

  createUserStory(){

    console.log("Creating user story");

    let body = {
      id: null,
      weight: this.weight,
      scrum_board_status: this.scrum_board_status,
      description: this.description,
      priority: this.priority,
      sprint_id: this.sprint_id
    };

    this.crud.create(this.crud.models.USER_STORY, body)
    .subscribe(
      (res: Response) => {

        console.log("User story successfully created");
        this.router.navigate(['user-stories']);
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
    return false;
  }

}
