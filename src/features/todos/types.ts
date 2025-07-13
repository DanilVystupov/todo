export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoInput {
  title: string;
  description?: string;
  completed?: boolean;
}
