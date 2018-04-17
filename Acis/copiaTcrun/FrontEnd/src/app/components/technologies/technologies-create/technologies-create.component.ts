import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Technology } from '../../../models/technology.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technologies-create',
  templateUrl: './technologies-create.component.html',
  styleUrls: ['./technologies-create.component.css']
})
export class TechnologiesCreateComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<boolean>();
  technology: Technology;
  message: string;

  constructor(private crud:CrudService, private router:Router) { }

  ngOnInit() {
    this.technology = new Technology('', null, null);
    this.message = "";
  }

  createTechnology(){
    if(this.validate()){
      this.crud.create(this.crud.models.TECHNOLOGY, this.technology)
      .subscribe(
        (res:Technology) => {
          this.technology = new Technology('', null, null);
          this.onSubmit.emit(true);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if(err.error){
            this.message = err.error.message;
          }
          else{
            this.message = err.error.errors[0].message;
          }
        }
      )
    }

    return false;
  }

  validate(){
    if(!this.technology.name){
      this.message = "El campo nombre no puede estar vacío.";
      return false;
    }

    return true;
  }
}
