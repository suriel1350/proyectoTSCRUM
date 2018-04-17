import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceCriteriaCreateComponent } from './acceptance-criteria-create.component';

describe('AcceptanceCriteriaCreateComponent', () => {
  let component: AcceptanceCriteriaCreateComponent;
  let fixture: ComponentFixture<AcceptanceCriteriaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceCriteriaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceCriteriaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
