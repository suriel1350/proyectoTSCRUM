import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Technology } from '../../../models/technology.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-technologies-update',
  templateUrl: './technologies-update.component.html',
  styleUrls: ['./technologies-update.component.css']
})
export class TechnologiesUpdateComponent implements OnInit {
  message: string;
  technology: Technology;

  constructor(private crud:CrudService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.technology = new Technology('', null, null);
    this.message= '';
    let id = this.route.snapshot.params.id;
    this.crud.retrieve(this.crud.models.TECHNOLOGY, id)
    .subscribe(
      (res: Technology) => {
        this.technology = res;
        console.log(this.technology);
      },
      (err: HttpErrorResponse) => {
        if(err.error){
          this.message = err.error.message;
        }
        else{
          this.message = err.error.errors[0].message;
        }
      }
    )
  }

  updateTechnology(){
    if(this.validate()){
      this.crud.update(this.crud.models.TECHNOLOGY, this.technology.id, this.technology)
      .subscribe(
        (res:Technology) => {
          this.router.navigate(['technologies']);
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
