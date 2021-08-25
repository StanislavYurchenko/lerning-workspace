/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  todoForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    ready: new FormControl(false),
  });

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    const getTodosSubscription = this.apiService
      .getTodos()
      .subscribe((todos) => (this.todos = todos));
    this.subscription.add(getTodosSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  addTodo() {
    const getTodosSubscription = this.apiService
      .addTodo(this.todoForm.value)
      .subscribe((todo) => this.todos.push(todo));
    this.subscription.add(getTodosSubscription);
  }
}
