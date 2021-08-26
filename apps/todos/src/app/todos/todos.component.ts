/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

// import { ServicesModule } from '@learning-workspace/services';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from 'libs/services/src/lib/api-services/api-services.service';
import { Todo } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public todos: Todo[] = [];
  public todoForm: FormGroup;

  constructor(
    private readonly apiService: ApiService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const getTodosSubscription = this.apiService
      .getTodos()
      .subscribe((todos) => (this.todos = todos));
    this.subscription.add(getTodosSubscription);

    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      ready: [false],
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTodo(): void {
    const getTodosSubscription = this.apiService
      .addTodo(this.todoForm.value)
      .subscribe((todo) => this.todos.push(todo));
    this.subscription.add(getTodosSubscription);
  }

  removeTodo(id: string): void {
    const removeTodosSubscription = this.apiService
      .removeTodoById(id)
      .subscribe((removedTodo) => {
        return (this.todos = this.todos.filter(
          (todo) => todo._id !== removedTodo._id
        ));
      });
    this.subscription.add(removeTodosSubscription);
  }

  editTodo(id: string): void {

    console.log('todoForm', this.todoForm);

    this.todoForm.setValue({
      title: 'test',
      description: "test123456789",
      ready: true,
    });
    // const removeTodosSubscription = this.apiService
    //   .updateTodoById(id, body)
    //   .subscribe((removedTodo) => {
    //     return (this.todos = this.todos.filter(
    //       (todo) => todo._id !== removedTodo._id
    //     ));
    //   });
    // this.subscription.add(removeTodosSubscription);
  }
}
