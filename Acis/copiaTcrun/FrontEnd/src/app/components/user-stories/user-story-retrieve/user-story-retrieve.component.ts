import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User_story } from '../../../models/user_story.model';
import { Acceptance_criteria } from '../../../models/acceptance_criteria.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-story-retrieve',
  templateUrl: './user-story-retrieve.component.html',
  styleUrls: ['./user-story-retrieve.component.css']
})
export class UserStoryRetrieveComponent implements OnInit {

  message: string;
  user_story: User_story;
  id: number;

  constructor(private crud:CrudService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.user_story =  new User_story(null, null, null, null, null);
    this.message = "";

    this.id = parseInt(this.route.snapshot.params.id);

    this.crud.retrieve(this.crud.models.USER_STORY, this.id)
    .subscribe(
      (res:User_story)=>{
        console.log(res);
        this.user_story = res;
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
