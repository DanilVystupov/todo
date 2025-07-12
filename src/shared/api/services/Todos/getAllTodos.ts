import { delay } from '@shared/utils/delay';
import { mockTodos } from './mockData';
import type { Todo } from '@features/todos/types';

export const getAllTodos = async (): Promise<Todo[]> => {
  await delay(1000);
  return [...mockTodos];
};
