import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTodoFormComponent } from './add-edit-todo-form.component';

describe('AddEditTodoFormComponent', () => {
  let component: AddEditTodoFormComponent;
  let fixture: ComponentFixture<AddEditTodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTodoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
