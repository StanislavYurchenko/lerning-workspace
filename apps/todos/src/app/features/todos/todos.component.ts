import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from 'libs/services/src/lib/api-services/api-services.service';
import { Todo } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  public todos: Todo[] = [];
  public todoForm: FormGroup;
  public editTodoId = '';

  private subscription = new Subscription();

  constructor(
    private readonly apiService: ApiService,
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getTodosSubscription();
    this.todoForm = this.AddEditTodoFormBuild();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addTodo(): void {
    if (this.editTodoId) {
      const removeTodosSubscription = this.apiService
        .updateTodoById(this.editTodoId, this.todoForm.value)
        .subscribe((updatedTodo) => {
          this.todos = this.todos.map((todo) =>
            todo._id === updatedTodo._id ? updatedTodo : todo
          );
          this.closeAddTodoForm();
        });
      this.subscription.add(removeTodosSubscription);
      this.editTodoId = '';
      return;
    }
    const getTodosSubscription = this.apiService
      .addTodo(this.todoForm.value)
      .subscribe((todo) => {
        this.todos.push(todo);
        this.closeAddTodoForm();
      });
    this.subscription.add(getTodosSubscription);
  }

  public removeTodo(id: string): void {
    const removeTodosSubscription = this.apiService
      .removeTodoById(id)
      .subscribe((removedTodo) => {
        return (this.todos = this.todos.filter(
          (todo) => todo._id !== removedTodo._id
        ));
      });
    this.subscription.add(removeTodosSubscription);
  }

  public editTodo(id: string, content: TemplateRef<unknown>): void {
    this.editTodoId = id;

    const todo = this.todos.find((todo) => todo._id === id);

    this.todoForm.setValue({
      title: todo?.title,
      description: todo?.description,
      ready: todo?.ready,
    });

    this.openAddTodoForm(content);
  }

  public checkTodo(id: string): void {
    const checkTodosSubscription = this.apiService
      .updateTodoById(id, { ready: true })
      .subscribe((updatedTodo) => {
        this.todos = this.todos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        );
      });
    this.subscription.add(checkTodosSubscription);
  }

  public openAddTodoForm(content: TemplateRef<unknown>): void {
    this.modalService.open(content, { centered: true }).result.then(
      () => {},
      () => this.closeAddTodoForm()
    );
  }

  public closeAddTodoForm(): void {
    this.todoForm.reset();
    this.modalService.dismissAll();
  }

  public todoIdentify(index: number, todo: Todo): string {
    return todo._id;
  }

  private AddEditTodoFormBuild(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ready: [false],
    });
  }

  // TODO: change subscription to rxjs
  private getTodosSubscription() {
    const getTodosSubscription = this.apiService
      .getTodos()
      .subscribe((todos) => (this.todos = todos));
    this.subscription.add(getTodosSubscription);
  }
}
