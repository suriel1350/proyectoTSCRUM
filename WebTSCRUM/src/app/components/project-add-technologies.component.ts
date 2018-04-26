import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProyectoService } from '../services/proyecto.service';
import { User } from '../models/miembro';
import { Detalles } from '../models/detallesids';

@Component({
  selector: 'ver-miembros', 
  templateUrl: '../views/ver-miembros.html',
  providers: [UserService, ProyectoService]
})

export class MiembrosGetComponent implements OnInit{
	public titulo: string;
	public user: User[] = [];
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public detalles: Detalles;		

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proyectoService: ProyectoService,
		private _userService: UserService
	){
		this.titulo = 'Tecnologías';		
		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = GLOBAL.url;
  		
	}

	ngOnInit(){
		console.log('project-add-technologies.component cargado');

		this.conseguirTecnologias();
	}

	conseguirTecnologias(){
		
	}

	addMiembro(id){
		
	}
}