import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CrudService } from '../../../services/crud.service';
import { Router } from '@angular/router';
import { Member } from '../../../models/member.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  member: Member;
  //A string to store the password confirmation
  passwordConfirmation: string; 

  constructor(private auth: AuthService, private router: Router, private crud: CrudService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home'])
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.passwordConfirmation = '';
    this.member = new Member('', '', '', '', '', null, null, '');
  }

  /**
   * Method to create a member with the parameters
   * that are asked for in the registration view.
   */
  createMember() {

    if (this.validateNonEmptyFields() && this.areEqualPasswords()) {

      this.crud.registerMember(this.member)
        .subscribe(
          (res: Member) => {

            /*  
              Ideally, a errorMessage of success should be displayed
              to let the user know that the registration was
              successful. So far, we're only taking the user 
              to the login view.
            */
            this.successMessage = 'The registration was successful!';
            this.router.navigate(['login']);
          },
          (err: HttpErrorResponse) => {
            console.log('Hello'); 
            console.log(err);
            if (err.error) {
              this.errorMessage = err.error.errorMessage;
            }
            else {
              this.errorMessage = err.error.error[0].errorMessage;
            }
          }
        )
    }

    return false;
  }

  /**
   * Method to validate that all fields have been entered
   * (they're all necessary). If at least one of the fields
   * hasn't been entered, then a errorMessage displaying what the
   * problem is should be displayed.
   * 
   * @returns True, if all fields have been entered. Else,
   * return false.
   */
  validateNonEmptyFields() {
    if (!this.member.id || 
        !this.member.name || 
        !this.member.department_major || 
        !this.member.password || 
        !this.passwordConfirmation) {
      this.errorMessage = 'Debes introducir tu matrícula, nombre, carrera o departamento, contraseña y la confirmación de la misma.';
      return false;
    }
    else {
      this.errorMessage = '';
      return true;
    }
  }

  /**
   * Method to validate that the password was correctly
   * confirmed.
   * 
   * @returns True, if exactly the same password was entered
   * twice. Else, false.
   */
  areEqualPasswords() {

    if (this.member.password == this.passwordConfirmation) {

      return true;
    }
    else {

      this.errorMessage = 'La contraseña no fue confirmada correctamente. Inténtalo de nuevo.'
      return false;
    }
  }
}
