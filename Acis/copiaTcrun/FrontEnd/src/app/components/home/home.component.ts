import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message:string;

  constructor(private crud:CrudService) { }

  ngOnInit() {
    this.message = "Ready";
  }

  clicked(){
    let body =  {
      id: null,
      department_major: 'ITC',
      name: 'firstName lastName',
      photo_URL: 'foto_URL',
      password: 'secret'
    };

    this.crud.create(this.crud.models.MEMBER, body)
    .subscribe(
      (res:Response) => {
        this.message = "Success";
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
