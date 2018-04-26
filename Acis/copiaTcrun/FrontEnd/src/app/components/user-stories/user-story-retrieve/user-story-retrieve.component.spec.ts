import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryRetrieveComponent } from './user-story-retrieve.component';

describe('UserStoryRetrieveComponent', () => {
  let component: UserStoryRetrieveComponent;
  let fixture: ComponentFixture<UserStoryRetrieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryRetrieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
