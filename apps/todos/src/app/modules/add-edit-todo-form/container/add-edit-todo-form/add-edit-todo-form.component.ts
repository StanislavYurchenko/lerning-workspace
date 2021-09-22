import { Component, Input, OnInit, AfterViewInit, TemplateRef, ViewChild, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddTodo } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-add-edit-todo-form',
  templateUrl: './add-edit-todo-form.component.html',
  styleUrls: ['./add-edit-todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditTodoFormComponent implements OnInit, AfterViewInit {
  @Input() editMode: boolean;
  @Input() todoForEdit: AddTodo;

  @Output() addEditFormEvent = new EventEmitter<AddTodo | undefined>();

  public todoForm: FormGroup;

  @ViewChild('content') content: TemplateRef<unknown>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.todoForm = this.addEditTodoFormBuild();
  }

  ngAfterViewInit(): void {
    this.openAddTodoForm(this.content);
  }

  private addEditTodoFormBuild(): FormGroup {
    return this.fb.group({
      title: [
        this.editMode ? this.todoForEdit?.title : '',
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        this.editMode ? this.todoForEdit?.description : '',
        [Validators.required, Validators.minLength(10)],
      ],
      ready: [this.editMode ? this.todoForEdit?.ready : false],
    });
  }

  public openAddTodoForm(content: TemplateRef<unknown>): void {
    this.modalService.open(content, { centered: true }).result.then(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      () => {
        this.addEditFormEvent.emit();
        this.closeAddTodoForm();
      }
    );
  }

  public closeAddTodoForm(): void {
    this.todoForm.reset();
    this.modalService.dismissAll();
  }

  public submitAddTodoForm(): void {
    this.addEditFormEvent.emit(this.todoForm.value);
    this.closeAddTodoForm();
  }
}
