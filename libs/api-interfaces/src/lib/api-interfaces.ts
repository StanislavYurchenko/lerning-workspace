export interface Todo {
  id: string;
  title: string;
  description: string;
  ready: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddTodo {
  title: string;
  description: string;
  ready: boolean;
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

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  verify: boolean;
  token?: string;
  verifyToken?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  data?: User;
  error?: {
    message: string;
  };
}

export interface UserRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLogoutRequest {
  id: string;
}

export interface UserLogoutResponse {
  data?: {
    message: string;
  };
  error?: {
    message: string;
  };
}
