import { useStore } from 'vuex';
import type { TodoInput } from '@features/todos/types';
import type { RootState } from '@/store';

export const useTodosActions = () => {
  const store = useStore<RootState>();

  return {
    addTodo: async (todo: TodoInput) =>
      await store.dispatch('todos/addTodo', todo) as Promise<void>,

    updateTodo: async (id: string, updates: Partial<TodoInput>) =>
      await store.dispatch('todos/updateTodo', { id, updates }) as Promise<void>,

    deleteTodo: async (id: string) =>
      await store.dispatch('todos/deleteTodo', id) as Promise<void>,

    fetchTodos: async () =>
      await store.dispatch('todos/fetchTodos') as Promise<void>,
  };
};
