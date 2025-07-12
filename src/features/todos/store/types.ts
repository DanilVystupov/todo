import type { ActionContext } from 'vuex';
import type { Todo } from '@features/todos/types';

export const MutationTypes = {
  SetTodos: 'setTodos',
  SetIsLoading: 'setisLoading',
  SetError: 'setError',
  AddTodo: 'addTodo',
  UpdateTodo: 'updateTodo',
  DeleteTodo: 'deleteTodo',
} as const

export type Mutations = {
  [MutationTypes.SetTodos](state: TodoState, todos: Todo[]): void;
  [MutationTypes.SetIsLoading](state: TodoState, isLoading: boolean): void;
  [MutationTypes.SetError](state: TodoState, error: string | null): void;
  [MutationTypes.AddTodo](state: TodoState, todo: Todo): void;
  [MutationTypes.UpdateTodo](state: TodoState, updatedTodo: Todo): void;
  [MutationTypes.DeleteTodo](state: TodoState, id: string): void;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TodoState, any>, 'commit'>;
