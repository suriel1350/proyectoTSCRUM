import { Component, OnInit } from '@angular/core';
import { Technology } from '../../../models/technology.model';
import { CrudService } from '../../../services/crud.service';
import { HttpResponse } from 'selenium-webdriver/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-technologies-list',
  templateUrl: './technologies-list.component.html',
  styleUrls: ['./technologies-list.component.css']
})
export class TechnologiesListComponent implements OnInit {
  message: string;
  technologies: Technology[];
  newTechnology: Technology;
  
  constructor(private crud:CrudService) { }

  ngOnInit() {
    this.newTechnology = new Technology('', null, null);
    this.message = "";
    this.updateList();
  }

  deleteTechnology(id:number){
    this.crud.delete(this.crud.models.TECHNOLOGY, id)
    .subscribe(
      res => {
        console.log(res);
        this.removeTechnology(id);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        if(err.message){
          this.message = err.message;
        }
        else if(err.error){
          this.message = err.error.message;
        }
        else{
          this.message = err.error.errors[0].message;
        }
      }
    )
  }

  removeTechnology(id:number){
    let i;
    for(i=0; i<this.technologies.length; i++){
      if(this.technologies[i].id == id){
        this.technologies.splice(i, 1);
        break;
      }
    }
  }

  updateList(){
    this.crud.list(this.crud.models.TECHNOLOGY)
    .subscribe(
      (res:Technology[]) => {
        console.log(res);
        this.technologies = res;
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

  onSubmit(event:true){
    this.updateList();
  }
}
