import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTechnologyComponent } from './project-technology.component';

describe('ProjectTechnologyComponent', () => {
  let component: ProjectTechnologyComponent;
  let fixture: ComponentFixture<ProjectTechnologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTechnologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
