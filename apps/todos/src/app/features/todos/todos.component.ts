import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from 'libs/services/src/lib/api-services/api-services.service';
import { Todo, AddTodo } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  public todos: Todo[] = [];
  public selectedTodo: Todo;
  public openAddEditForm = false;
  public editMode = false;

  private subscription = new Subscription();

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.getTodosSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addTodo(): void {
    this.editMode = false;
    this.openAddEditTodoForm();
  }

  public removeTodo(id: string): void {
    this.removeTodoSubscription(id);
  }

  public editTodo(id: string): void {
    this.editMode = true;
    this.selectedTodo = this.todos.find((todo) => todo._id === id) as Todo;
    this.openAddEditTodoForm();
  }

  public checkTodo(id: string): void {
    this.checkTodoSubscription(id);
  }

  public openAddEditTodoForm() {
    this.openAddEditForm = !this.openAddEditForm;
  }

  public afterCloseAddEditTodoForm(todo: AddTodo | undefined) {
    this.openAddEditForm = false;

    if (!todo?.title) {
      return;
    }

    if (this.editMode) {
      this.editTodoSubscription(this.selectedTodo._id, todo);
      this.editMode = false;
      return;
    }

    this.addTodoSubscription(todo);
  }

  public todoIdentify(_index: number, todo: Todo): string {
    return todo._id;
  }

  // TODO: change subscription to rxjs
  private getTodosSubscription(): void {
    const getTodosSubscription = this.apiService
      .getTodos()
      .subscribe((todos) => (this.todos = todos));
    this.subscription.add(getTodosSubscription);
  }

  private addTodoSubscription(todo: AddTodo): void {
    const getTodosSubscription = this.apiService
      .addTodo(todo)
      .subscribe((todo) => this.todos.push(todo));
    this.subscription.add(getTodosSubscription);
  }

  private editTodoSubscription(id: string, todo: AddTodo): void {
    const removeTodosSubscription = this.apiService
      .updateTodoById(id, todo)
      .subscribe((updatedTodo) => {
        this.todos = this.todos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        );
      });
    this.subscription.add(removeTodosSubscription);
  }

  private checkTodoSubscription(id: string): void {
    const checkTodosSubscription = this.apiService
      .updateTodoById(id, { ready: true })
      .subscribe((updatedTodo) => {
        this.todos = this.todos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        );
      });
    this.subscription.add(checkTodosSubscription);
  }

  private removeTodoSubscription(id: string): void {
    const removeTodosSubscription = this.apiService
      .removeTodoById(id)
      .subscribe((removedTodo) => {
        this.todos = this.todos.filter((todo) => todo._id !== removedTodo._id);
      });
    this.subscription.add(removeTodosSubscription);
  }
}
