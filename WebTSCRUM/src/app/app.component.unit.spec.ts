import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { ProyectoService } from './services/proyecto.service'; 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { GLOBAL } from './services/global';

describe('Unit test - Tcrum', () => {
  let component: AppComponent;
  let url= GLOBAL.url;
  let service: ProyectoService;

  beforeEach(async(() => {
    service = new ProyectoService(null);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  //spyOn(service, 'getMiembro');

  //service.setBar(123);


  it('no deberia de existir informacion de token sin iniciar sesion', () => {
    expect( localStorage.getItem('token') ).toBeNull;
  });

  it('no deberia retornar informacion sin iniciar sesion', () => {
    
    //spyOn(component, 'logout');
    //service.getMiembro('101010',1);
    //component.localStorage.getItem('token');
    spyOn(service, 'getMiembro').and.callFake(() => {
      return Observable.empty();
    });
    
    expect( service.getMiembro('101010',1) ).toBeNull;
  });


});
