import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Todo, AddTodo } from '@learning-workspace/api-interfaces';
import { TodoService } from '../../../../core/services';
import { TodoActionEnum } from '../../enums';

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
  public searchInit = '';

  private subscription = new Subscription();
  private params: Params;

  constructor(
    private readonly todoService: TodoService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription();
    this.getQueryFromParam();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addTodo(): void {
    this.editMode = false;
    this.openAddEditTodoForm();
  }

  public todoActionRun(action: string, id: string): void {
    switch (action) {
      case TodoActionEnum.check:
        this.checkTodo(id);
        break;

      case TodoActionEnum.edit:
        this.editTodo(id);
        break;

      case TodoActionEnum.remove:
        this.removeTodo(id);
        break;
    }
  }

  public openAddEditTodoForm(): void {
    this.openAddEditForm = !this.openAddEditForm;
  }

  public afterCloseAddEditTodoForm(todo: AddTodo | undefined): void {
    this.openAddEditForm = false;

    if (!todo?.title) {
      return;
    }

    if (this.editMode) {
      this.editTodoSubscription(this.selectedTodo.id, todo);
      this.editMode = false;
      return;
    }

    this.addTodoSubscription(todo);
  }

  public todoIdentify(_index: number, todo: Todo): string {
    return todo.id;
  }

  public searchHandle(query: string): void {
    this.setQueryParam(query);
  }

  private removeTodo(id: string): void {
    this.removeTodoSubscription(id);
  }

  private editTodo(id: string): void {
    this.editMode = true;
    this.selectedTodo = this.todos.find((todo) => todo.id === id) as Todo;
    this.openAddEditTodoForm();
  }

  private checkTodo(id: string): void {
    this.checkTodoSubscription(id);
  }

  private setQueryParam(param: string): void {
    this.router.navigate([], {
      queryParams: {
        search: param,
      },
    });
  }

  private getQueryFromParam() {
    this.searchInit = this.params?.search;
  }

  // TODO: change subscription to rxjs
  private getTodosSubscription(params: Params): void {
    this.subscription.add(
      this.todoService
        .getTodos(params)
        .subscribe((todos) => (this.todos = todos))
    );
  }

  private addTodoSubscription(todo: AddTodo): void {
    this.subscription.add(
      this.todoService.addTodo(todo).subscribe((todo) => this.todos.push(todo))
    );
  }

  private editTodoSubscription(id: string, todo: AddTodo): void {
    this.subscription.add(
      this.todoService.updateTodoById(id, todo).subscribe((updatedTodo) => {
        this.todos = this.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      })
    );
  }

  private checkTodoSubscription(id: string): void {
    this.subscription.add(
      this.todoService
        .updateTodoById(id, { ready: true })
        .subscribe((updatedTodo) => {
          this.todos = this.todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          );
        })
    );
  }

  private removeTodoSubscription(id: string): void {
    this.subscription.add(
      this.todoService.removeTodoById(id).subscribe((removedTodo) => {
        this.todos = this.todos.filter((todo) => todo.id !== removedTodo.id);
      })
    );
  }

  private paramsSubscription(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.params = params;
        this.getTodosSubscription(this.params);
      })
    );
  }
}
