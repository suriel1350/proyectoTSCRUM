import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintRetrieveComponent } from './sprint-retrieve.component';

describe('SprintRetrieveComponent', () => {
  let component: SprintRetrieveComponent;
  let fixture: ComponentFixture<SprintRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintRetrieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
