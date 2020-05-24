import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListsComponent } from './employee-lists.component';

describe('EmployeeListsComponent', () => {
  let component: EmployeeListsComponent;
  let fixture: ComponentFixture<EmployeeListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
