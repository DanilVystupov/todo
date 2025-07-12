import { delay } from '@shared/utils/delay';
import { mockTodos } from './mockData';

export const deleteTodo = async (id: string): Promise<void> => {
  await delay(500);

  const index = mockTodos.findIndex((todo) => todo.id === id);
  if (index === -1) throw new Error('Задача не найдена');

  mockTodos.splice(index, 1);
};
