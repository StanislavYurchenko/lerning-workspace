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
  public selectedTodo: Todo;
  public openAddEditForm = false;

  private subscription = new Subscription();

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.getTodosSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addTodo(): void {
    // if (this.editTodoId) {
    //   const removeTodosSubscription = this.apiService
    //     .updateTodoById(this.editTodoId, this.todoForm.value)
    //     .subscribe((updatedTodo) => {
    //       this.todos = this.todos.map((todo) =>
    //         todo._id === updatedTodo._id ? updatedTodo : todo
    //       );
    //       this.closeAddTodoForm();
    //     });
    //   this.subscription.add(removeTodosSubscription);
    //   this.editTodoId = '';
    //   return;
    // }
    // const getTodosSubscription = this.apiService
    //   .addTodo(this.todoForm.value)
    //   .subscribe((todo) => {
    //     this.todos.push(todo);
    //     this.closeAddTodoForm();
    //   });
    // this.subscription.add(getTodosSubscription);
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

  public editTodo(id: string): void {
    this.selectedTodo = this.todos.find((todo) => todo._id === id) as Todo;
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

  public todoIdentify(_index: number, todo: Todo): string {
    return todo._id;
  }

  public openAddEditTodoForm() {
    this.openAddEditForm = true;
  }

  public closeAddEditTodoForm() {
    this.openAddEditForm = false;
  }

  // TODO: change subscription to rxjs
  private getTodosSubscription() {
    const getTodosSubscription = this.apiService
      .getTodos()
      .subscribe((todos) => (this.todos = todos));
    this.subscription.add(getTodosSubscription);
  }
}
