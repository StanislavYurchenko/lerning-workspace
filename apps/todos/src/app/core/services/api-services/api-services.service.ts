import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  Todo,
  TodosResponse,
  TodoResponse,
} from '@learning-workspace/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  getTodos(params: Params): Observable<Todo[]> {
    return this.http
      .get<TodosResponse>('/api/todos', { params })
      .pipe(map((res) => res.data.todos));
  }

  getTodoById(id: string): Observable<Todo> {
    return this.http
      .get<TodoResponse>(`/api/todo/${id}`)
      .pipe(map((res) => res.data));
  }

  addTodo(body: Partial<Todo>): Observable<Todo> {
    return this.http
      .post<TodoResponse>('/api/todo', body)
      .pipe(map((res) => res.data));
  }

  updateTodoById(id: string, body: Partial<Todo>): Observable<Todo> {
    return this.http
      .put<TodoResponse>(`/api/todo/${id}`, body)
      .pipe(map((res) => res.data));
  }

  removeTodoById(id: string): Observable<Todo> {
    return this.http
      .delete<TodoResponse>(`/api/todo/${id}`)
      .pipe(map((res) => res.data));
  }
}
