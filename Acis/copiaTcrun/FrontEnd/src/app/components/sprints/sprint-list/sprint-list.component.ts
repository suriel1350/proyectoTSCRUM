import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Sprint } from '../../../models/sprint.model';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {

  message: string;
  sprints: Sprint[];

  constructor(private crud: CrudService) { }

  ngOnInit() {

    this.crud.list(this.crud.models.PROJECT)
      .subscribe(
        (res: Sprint[]) => {
          console.log(res);
          this.sprints = res;
        },
        (err: HttpErrorResponse) => {
          if (err.error) {
            this.message = err.error.message
          }
          else {
            this.message = err.error.errors[0].message;
          }
        }
      )
  }

  deleteSprint(id: number) {
    console.log("Deleting")
    this.crud.delete(this.crud.models.SPRINT, id)

    .subscribe(
      (res: Response) => {
        this.message = "Succes";
        let x = 0;

        for (let sprint of this.sprints) {
          if (sprint.id == id) {
            this.sprints.splice(x, 1);
          }

          x++;
        }
      },

      (err: HttpErrorResponse) => {
        if (err.error) {
          this.message = err.error.message
        }
        else {
          this.message = err.error.errors[0].message;
        }
      }
    )
  }
}
