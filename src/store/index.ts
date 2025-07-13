import { createStore } from 'vuex';
import { useTodosStore, type TodosStoreState } from '@/features/todos/store';

export interface RootState {
  todos: TodosStoreState;
}

export default createStore<RootState>({
  modules: {
    todos: useTodosStore,
  },
});
