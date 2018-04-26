import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { CrudService } from './services/crud.service';
import { LogService } from './services/log.service';

import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { TechnologiesListComponent } from './components/technologies/technologies-list/technologies-list.component';
import { AcceptanceCriteriaEditComponent } from './components/acceptance-criteria/acceptance-criteria-edit/acceptance-criteria-edit.component';
import { TechnologiesCreateComponent } from './components/technologies/technologies-create/technologies-create.component';
import { TechnologiesUpdateComponent } from './components/technologies/technologies-update/technologies-update.component';
import { ProjectCreateComponent } from './components/projects/project-create/project-create.component';
import { ProjectUpdateComponent } from './components/projects/project-update/project-update.component';
import { ProjectRetrieveComponent } from './components/projects/project-retrieve/project-retrieve.component';
import { UserStoryListComponent } from './components/user-stories/user-story-list/user-story-list.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskCreateComponent } from './components/tasks/task-create/task-create.component';
import { AcceptanceCriteriaListComponent } from './components/acceptance-criteria/acceptance-criteria-list/acceptance-criteria-list.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { AcceptanceCriteriaCreateComponent } from './components/acceptance-criteria/acceptance-criteria-create/acceptance-criteria-create.component';
import { UserStoryCreateComponent } from './components/user-stories/user-story-create/user-story-create.component';
import { SprintListComponent } from './components/sprints/sprint-list/sprint-list.component';
import { SprintRetrieveComponent } from './components/sprints/sprint-retrieve/sprint-retrieve.component';
import { TaskUpdateComponent } from './components/tasks/task-update/task-update.component';
import { ProjectSprintCreateComponent } from './components/projects/project-sprint-create/project-sprint-create.component';
import { UserStoryUpdateComponent } from './components/user-stories/user-story-update/user-story-update.component';
import { UserStoryRetrieveComponent } from './components/user-stories/user-story-retrieve/user-story-retrieve.component';
import { ProjectTechnologyComponent } from './components/projects/project-technology/project-technology.component';
import { ProjectMemberComponent } from './components/projects/project-member/project-member.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    NavComponent,
    AcceptanceCriteriaListComponent,
    ProjectListComponent,
    UserStoryListComponent,
    TaskListComponent,
    MemberCreateComponent,
    SprintListComponent,
    TechnologiesListComponent,
    AcceptanceCriteriaCreateComponent,
    AcceptanceCriteriaEditComponent,
    TechnologiesCreateComponent,
    TechnologiesUpdateComponent,
    MemberCreateComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    ProjectRetrieveComponent,
    TaskListComponent,
    UserStoryListComponent,
    TaskCreateComponent,
    AcceptanceCriteriaListComponent,
    SprintListComponent,
    UserStoryCreateComponent,
    TaskUpdateComponent,
    UserStoryUpdateComponent,
    UserStoryRetrieveComponent,
    TaskUpdateComponent,
    SprintRetrieveComponent,
    ProjectSprintCreateComponent,
    ProjectSprintCreateComponent,
    ProjectTechnologyComponent,
    ProjectMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    CrudService,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
