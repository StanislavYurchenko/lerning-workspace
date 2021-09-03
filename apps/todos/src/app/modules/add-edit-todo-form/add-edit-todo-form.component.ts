import { Component, Input, OnInit, AfterViewInit, TemplateRef, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Todo } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-add-edit-todo-form',
  templateUrl: './add-edit-todo-form.component.html',
  styleUrls: ['./add-edit-todo-form.component.scss'],
})
export class AddEditTodoFormComponent implements OnInit, AfterViewInit {
  @Input() modalCloseCallBack: () => void;
  @Input() editMode: boolean;
  @Input() todoForEdit: Partial<Todo> = {
    title: '',
    description: '',
    ready: false,
  };

  @Output() todo: Partial<Todo>;

  @ViewChild('content') content: TemplateRef<unknown>;
  public todoForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.todoForm = this.AddEditTodoFormBuild();
  }

  ngAfterViewInit() {
    this.openAddTodoForm(this.content);
  }

  private AddEditTodoFormBuild(): FormGroup {
    return this.fb.group({
      title: [
        this.todoForEdit.title,
        [Validators.required, Validators.minLength(3)],
      ],
      description: [
        this.todoForEdit.description,
        [Validators.required, Validators.minLength(10)],
      ],
      ready: [this.todoForEdit.ready],
    });
  }

  public openAddTodoForm(content: TemplateRef<unknown>): void {
    this.modalService.open(content, { centered: true }).result.then(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      () => {
        this.closeAddTodoForm();
        this.modalCloseCallBack();
      }
    );
  }

  public closeAddTodoForm(): void {
    console.log('closeAddTodoForm');
    this.todoForm.reset();
    // this.modalService.dismissAll();
  }

  public submitAddTodoForm(): void {
    console.log('submitAddTodoForm');
  }
}
