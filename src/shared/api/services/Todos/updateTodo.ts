import { delay } from '@shared/utils/delay';
import { mockTodos } from './mockData';
import type { Todo, TodoInput } from '@features/todos/types';

export const updateTodo = async (
  id: string,
  updates: Partial<TodoInput>
): Promise<Todo> => {
  await delay(500);

  const index = mockTodos.findIndex((todo) => todo.id === id);
  if (index === -1) throw new Error('Задача не найдена');

  const updatedTodo: Todo = {
    ...mockTodos[index],
    ...updates,
  };

  mockTodos[index] = updatedTodo;
  return updatedTodo;
};
