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
  email:string;
  password: string;
  
  public user: User;
  public identidad;
  public token;
  public errorMessage;

  constructor(private router:Router, private auth:AuthService) { 
      this.user = new User('','','','','','ROLE_USER','');    
   }

  ngOnInit() {
    this.message = 'Estado de la peticion.';
    this.identidad = this.auth.conseguirIdentidad();
    this.token = this.auth.conseguirToken();
  }

  login(){
    console.log(this.user);

    //Conseguimos los datos primero del usuario
    this.auth.login(this.user).subscribe(
      (response) =>{
        let identidad = response.user;
        this.identidad = identidad;

        if(!this.identidad._id){
          alert("El usuario no está correctamente identificado");
        }else{

          // Crear elemento en el local Storage para tener al usuario en la sesión
          localStorage.setItem('identidad', JSON.stringify(identidad));          

          //Conseguir el token para enviarlo a cada peticion http           
          this.auth.login(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if(this.token.length <= 0){
                alert("El token no se ha generado");
              }else{
                // Crear elemento en el local Storage para tener token disponible
                localStorage.setItem('token', token);
                this.user = new User('','','','','','ROLE_USER','');                                
                console.log(token);
                this.router.navigate(['']);
                this.message = 'Usuario correctamente logueado';
              }
            },
            error => {
              var errorMessage = <any>error;

              if(errorMessage!=null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(error);
              }
            }
          );
        }
      },
      error =>{
        console.log(error);
      }
    );

    return false;
  }
}
