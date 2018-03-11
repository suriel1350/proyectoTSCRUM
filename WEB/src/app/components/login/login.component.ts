import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  token: string;
  user: User;

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit() {
    if(this.auth.getUser() != null){
      this.router.navigate(['']);
    }

    this.message = 'Estado de la peticion.';
    this.user = new User('','','','','','ROLE_USER','');
    this.token = '';
  }

  login(){
    //Conseguimos los datos primero del usuario
    this.auth.login(this.user).subscribe(
      (response) =>{
        let password = this.user.password;
        this.user = response.user;
        this.user.password = password;

        if(!this.user._id){
          this.message = "El usuario no está correctamente identificado.";
        }
        else{          
          //Conseguir el token para enviarlo a cada peticion http
          this.auth.login(this.user, true).subscribe(
            (response) => {
              this.token = response.token;
              if(this.token.length <= 0){
                this.message = "El token no se ha generado correctamente.";
              }
              else{
                // Creamos el elemento user y token en local Storage para usarlo en la sesión
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('token', this.token);                        

                this.router.navigate(['proyectos/crear']);
              }
            },
            error => {
              this.user.password = '';
              console.log("Error en el token.");
              var errorMessage = <any>error;

              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.message = body.message;
                console.log(error);
              }
            }
          );
        }
      },
      error =>{
        this.user.password = '';
        var body = JSON.parse(error._body);
        this.message = body.message;
        console.log(error);
      }
    );

    return false;
  }
}
