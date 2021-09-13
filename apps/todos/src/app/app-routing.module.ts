import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './modules/about/about.component';
import { TodoDetailsComponent } from './features/todo-details/todo-details.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  {
    path: 'todos',
    loadChildren: () =>
      import('./features/todos/todos.module').then(
        (module) => module.TodosModule
      ),
  },
  { path: 'todos/:id', component: TodoDetailsComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
