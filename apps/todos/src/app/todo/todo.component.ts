import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiService } from 'libs/services/src/lib/api-services/api-services.service';
import { Subscription } from 'rxjs';

import { Todo } from '@learning-workspace/api-interfaces';

@Component({
  selector: 'learning-workspace-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public todoId: string;
  public todo: Todo;
  public loading: true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params.id;

    console.log(this.route);
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

