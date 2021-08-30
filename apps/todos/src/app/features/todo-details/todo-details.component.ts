import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from 'libs/services/src/lib/api-services/api-services.service';
import { Subscription } from 'rxjs';

import { Todo } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-todo',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  public todoId: string;
  public todo: Todo;
  public loading = true;

  private subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}

  // TODO: change subscription to rxjs
  ngOnInit(): void {
    this.todoId = this.route.snapshot.params.id;

    const getTodoSubscription = this.apiService
      .getTodoById(this.todoId)
      .subscribe((todo) => {
        this.todo = todo;
        this.loading = true;
      });
    this.subscription.add(getTodoSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

