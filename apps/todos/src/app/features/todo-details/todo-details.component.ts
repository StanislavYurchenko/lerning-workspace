import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Todo } from '@learning-workspace/api-interfaces';
import { ApiService } from '../../core/services';

@Component({
  selector: 'learning-workspace-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  public todoId = '';
  public todo: Todo;
  public loading = true;

  private subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.todoId = this.getTodoIdFromRoute();
    this.getTodoSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // TODO: change subscription to rxjs
  private getTodoSubscription(): void {
    const getTodoSubscription = this.apiService
      .getTodoById(this.todoId)
      .subscribe((todo) => {
        this.todo = todo;
        this.loading = false;
      });
    this.subscription.add(getTodoSubscription);
  }

  private getTodoIdFromRoute(): string {
    return this.route.snapshot.params.id;
  }
}

