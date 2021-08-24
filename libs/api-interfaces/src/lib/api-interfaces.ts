export interface Message {
  message: string;
}
export interface Todo {
  _id: string;
  title: string;
  description: string;
  ready: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodosResponse {
  data: {
    todos: Todo[];
    total: number;
    limit: number;
    page: number;
  };
}

export interface TodoResponse {
  data:  Todo;
}
