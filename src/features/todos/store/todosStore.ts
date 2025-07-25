import type { Todo, TodoInput } from '@features/todos/types';
import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo
} from '@shared/api/services/Todos';

import { MutationTypes, type AugmentedActionContext, type TodosStoreState } from './types';

export const useTodosStore = {
  namespaced: true,
  state: (): TodosStoreState => ({
    todos: [],
    isLoading: false,
    error: null,
  }),

  mutations: {
    setTodos(state: TodosStoreState, todos: Todo[]) {
      state.todos = todos;
    },
    setisLoading(state: TodosStoreState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    setError(state: TodosStoreState, error: string | null) {
      state.error = error;
    },
    addTodo(state: TodosStoreState, todo: Todo) {
      state.todos.push(todo);
    },
    updateTodo(state: TodosStoreState, updatedTodo: Todo) {
      const index = state.todos.findIndex((t) => t.id === updatedTodo.id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }
    },
    deleteTodo(state: TodosStoreState, id: string) {
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
    todos: (state: TodosStoreState) => state.todos,
    isLoading: (state: TodosStoreState) => state.isLoading,
    error: (state: TodosStoreState) => state.error,
  },
};
