import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Todo } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-add-edit-todo-form',
  templateUrl: './add-edit-todo-form.component.html',
  styleUrls: ['./add-edit-todo-form.component.scss'],
})
export class AddEditTodoFormComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() todo: Partial<Todo> = {
    title: '',
    description: '',
    ready: false,
  };

  public todoForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.todoForm = this.AddEditTodoFormBuild();
  }

  private AddEditTodoFormBuild(): FormGroup {
    return this.fb.group({
      title: [this.todo.title, [Validators.required, Validators.minLength(3)]],
      description: [
        this.todo.description,
        [Validators.required, Validators.minLength(10)],
      ],
      ready: [this.todo.ready],
    });
  }

  public openAddTodoForm(content: TemplateRef<unknown>): void {
    console.log('openAddTodoForm');
    this.modalService.open(content, { centered: true }).result.then(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      () => this.closeAddTodoForm()
    );
  }

  public closeAddTodoForm(): void {
    console.log('closeAddTodoForm');
    // this.todoForm.reset();
    // this.modalService.dismissAll();
  }

  public submitAddTodoForm(): void {
    console.log('submitAddTodoForm');
  }
}
