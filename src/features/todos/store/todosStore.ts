import type { Todo, TodoInput } from '@features/todos/types';
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo
} from '@shared/api/services/Todos';

import { MutationTypes, type AugmentedActionContext, type TodoState } from './types';

export const useTodosStore = {
  namespaced: true,
  state: (): TodoState => ({
    todos: [],
    isLoading: false,
    error: null,
  }),

  mutations: {
    setTodos(state: TodoState, todos: Todo[]) {
      state.todos = todos;
    },
    setisLoading(state: TodoState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    setError(state: TodoState, error: string | null) {
      state.error = error;
    },
    addTodo(state: TodoState, todo: Todo) {
      state.todos.push(todo);
    },
    updateTodo(state: TodoState, updatedTodo: Todo) {
      const index = state.todos.findIndex((t) => t.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }
    },
    deleteTodo(state: TodoState, id: string) {
      state.todos = state.todos.filter((t) => t.id !== id);
    },
  },

  actions: {
    async fetchTodos({ commit }: AugmentedActionContext) {
      commit(MutationTypes.SetIsLoading, true);
      try {
        const todos = await getAllTodos();
        commit(MutationTypes.SetTodos, todos);
        commit(MutationTypes.SetError, null);
      } catch (error) {
        commit(MutationTypes.SetError, 'Ошибка при получении списка задач');
      } finally {
        commit(MutationTypes.SetIsLoading, false);
      }
    },
    async addTodo({ commit }: AugmentedActionContext, todoInput: TodoInput) {
      commit(MutationTypes.SetIsLoading, true);
      try {
        const todo = await addTodo(todoInput);
        commit(MutationTypes.AddTodo, todo);
        commit(MutationTypes.SetError, null);
      } catch (error) {
        commit(MutationTypes.SetError, 'Ошибка при добавлении задачи');
      } finally {
        commit(MutationTypes.SetIsLoading, false);
      }
    },
    async updateTodo(
      { commit }: AugmentedActionContext,
      { id, updates }: { id: string; updates: Partial<TodoInput> }
    ) {
      commit(MutationTypes.SetIsLoading, true);
      try {
        const updatedTodo = await updateTodo(id, updates);
        commit(MutationTypes.UpdateTodo, updatedTodo);
        commit(MutationTypes.SetError, null);
      } catch (error) {
        commit(MutationTypes.SetError, 'Ошибка при обновлении задачи');
      } finally {
        commit(MutationTypes.SetIsLoading, false);
      }
    },
    async deleteTodo({ commit }: AugmentedActionContext, id: string) {
      commit(MutationTypes.SetIsLoading, true);
      try {
        await deleteTodo(id);
        commit(MutationTypes.DeleteTodo, id);
        commit(MutationTypes.SetError, null);
      } catch (error) {
        commit(MutationTypes.SetError, 'Ошибка при удалении задачи');
      } finally {
        commit(MutationTypes.SetIsLoading, false);
      }
    },
  },

  getters: {
    todos: (state: TodoState) => state.todos,
    isLoading: (state: TodoState) => state.isLoading,
    error: (state: TodoState) => state.error,
  },
};
