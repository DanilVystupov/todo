import { delay } from '@shared/utils/delay';
import { mockTodos } from './mockData';
import { generateId } from '@shared/utils';
import type { Todo, TodoInput } from '@features/todos/types';

export const addTodo = async (input: TodoInput): Promise<Todo> => {
  await delay(2000);
  const newTodo: Todo = {
    id: generateId(),
    title: input.title,
    description: input.description,
    completed: false,
    createdAt: new Date(),
  };
  mockTodos.push(newTodo);
  return newTodo;
};
