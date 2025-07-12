import type { Todo } from '@features/todos/types';

export const mockTodos: Todo[] = [
  {
    id: 1,
    title: 'Задача 1',
    description: 'Описание к задаче 1',
    completed: false,
    createdAt: new Date(),
  },
];
