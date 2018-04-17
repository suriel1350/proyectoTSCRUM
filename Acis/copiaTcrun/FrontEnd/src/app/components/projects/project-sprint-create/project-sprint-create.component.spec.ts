import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprintCreateComponent } from './project-sprint-create.component';

describe('ProjectSprintCreateComponent', () => {
  let component: ProjectSprintCreateComponent;
  let fixture: ComponentFixture<ProjectSprintCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSprintCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSprintCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
