import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceCriteriaEditComponent } from './acceptance-criteria-edit.component';

describe('AcceptanceCriteriaEditComponent', () => {
  let component: AcceptanceCriteriaEditComponent;
  let fixture: ComponentFixture<AcceptanceCriteriaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceCriteriaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceCriteriaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
