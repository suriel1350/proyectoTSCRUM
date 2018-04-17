import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceCriteriaListComponent } from './acceptance-criteria-list.component';

describe('AcceptanceCriteriaListComponent', () => {
  let component: AcceptanceCriteriaListComponent;
  let fixture: ComponentFixture<AcceptanceCriteriaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceCriteriaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceCriteriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
