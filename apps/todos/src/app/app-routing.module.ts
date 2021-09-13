import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/about/about.module').then(
        (module) => module.AboutModule
      ),
  },
  {
    path: 'todos',
    loadChildren: () =>
      import('./features/todos/todos.module').then(
        (module) => module.TodosModule
      ),
  },
  {
    path: 'todos/:id',
    loadChildren: () =>
      import('./features/todo-details/todo-details.module').then(
        (module) => module.TodoDetailsModule
      ),
  },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/page-not-found/page-not-found.module').then(
        (module) => module.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
