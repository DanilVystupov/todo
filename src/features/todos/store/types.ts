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
  [MutationTypes.SetTodos](state: TodosStoreState, todos: Todo[]): void;
  [MutationTypes.SetIsLoading](state: TodosStoreState, isLoading: boolean): void;
  [MutationTypes.SetError](state: TodosStoreState, error: string | null): void;
  [MutationTypes.AddTodo](state: TodosStoreState, todo: Todo): void;
  [MutationTypes.UpdateTodo](state: TodosStoreState, updatedTodo: Todo): void;
  [MutationTypes.DeleteTodo](state: TodosStoreState, id: string): void;
}

export interface TodosStoreState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TodosStoreState, any>, 'commit'>;
