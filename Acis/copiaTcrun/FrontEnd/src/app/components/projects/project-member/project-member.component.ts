import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member.model';
import { CrudService } from '../../../services/crud.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../../../models/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.css']
})
export class ProjectMemberComponent implements OnInit {

  message: string;
  project: Project;
  project_roles: string[];
  project_role: string;
  member_id: string;
  members: Member[];
  projectMembers: Member[];

  constructor(private crud: CrudService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.message = '';
    this.project_roles = ['Scrum Master', 'Developer', 'Architect', 'Product Owner', 'Tester', 'Designer'];
    this.project_role = '';
    this.member_id = '';
    this.getAllMembers();

    let id = this.route.snapshot.params.id;
    this.getProjectMembers(id);
  }

  getAllMembers() {

    this.crud.list(this.crud.models.MEMBER)
      .subscribe(
        (res: Member[]) => {
          console.log(res);
          this.members = res;
        },
        (err: HttpErrorResponse) => {
          if (err.error) {
            this.message = err.error.message;
          }
          else {
            this.message = err.error.errors[0].message;
          }
        }
      )
  }

  getProjectMembers(id: number) {

    this.crud.retrieve(this.crud.models.PROJECT, id)
      .subscribe(
        (res: Project) => {
          console.log(res);
          this.project = res;
          this.projectMembers = res.members;
          console.log(this.projectMembers);
        },
        (err: HttpErrorResponse) => {
          if (err.error) {
            this.message = err.error.message;
          }
          else {
            this.message = err.error.errors[0].message;
          }
        }
      )
  }

  allFieldsAreSelected() {

    if (!this.member_id || !this.project_role) {

      this.message = 'Debes seleccionar un miembro y su rol correspondiente.';
      return false;
    }

    return true;
  }

  addMember() {

    if (this.allFieldsAreSelected()) {

      let body = {

        member_id: this.member_id,
        project_id: this.project.id,
        project_role: this.project_role
      }

      this.crud.create(this.crud.models.MEMBER_PROJECT, body)
        .subscribe(
          res => {
            this.project_role = '';
            this.member_id = '';
            this.getProjectMembers(this.project.id);
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            if (err.error) {
              this.message = err.error.message;
            }
            else {
              this.message = err.error.errors[0].message;
            }
          }
        )
    }
  }

}
