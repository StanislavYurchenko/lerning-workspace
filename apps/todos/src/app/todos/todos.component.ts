/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public todos: Todo[] = [];

  constructor(private readonly apiService: ApiService) {}

  private subscription = new Subscription();

  ngOnInit(): void {
    const todosSubscription = this.apiService
      .getTodos()
      .subscribe((todos) => (this.todos = todos));    
    this.subscription.add(todosSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
