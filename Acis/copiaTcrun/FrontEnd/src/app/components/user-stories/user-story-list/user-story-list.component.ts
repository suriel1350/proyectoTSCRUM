import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User_story } from '../../../models/user_story.model';

@Component({
  selector: 'app-user-story-list',
  templateUrl: './user-story-list.component.html',
  styleUrls: ['./user-story-list.component.css']
})
export class UserStoryListComponent implements OnInit {
  sprint_id: number;
  message: string;
  user_stories: User_story[];

  constructor(private crud:CrudService) { }

  ngOnInit() {
    this.sprint_id = 2;
    this.crud.list(this.crud.models.USER_STORY)
    .subscribe(
      (res:User_story[])=>{
        console.log(res);
        this.user_stories = res;
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

  deleteUserStory(id: number){
    console.log("Deleting")
    this.crud.delete(this.crud.models.USER_STORY, id)
    .subscribe(
      (res:Response) => {
        this.message = "Success";
        let x = 0;
        for(let user_story of this.user_stories){
          if(user_story.id == id){

            this.user_stories.splice(x, 1);
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
