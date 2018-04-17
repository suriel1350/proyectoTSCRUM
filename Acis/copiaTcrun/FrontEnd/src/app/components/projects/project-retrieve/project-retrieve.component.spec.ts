import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRetrieveComponent } from './project-retrieve.component';

describe('ProjectRetrieveComponent', () => {
  let component: ProjectRetrieveComponent;
  let fixture: ComponentFixture<ProjectRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRetrieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
