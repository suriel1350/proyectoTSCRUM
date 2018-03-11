import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectCreateComponent } from './components/projects/project-create/project-create.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'proyectos/crear', component: ProjectCreateComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
