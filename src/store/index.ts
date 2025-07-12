import { createStore } from 'vuex';
import { useTodosStore } from '@/features/todos/store/todosStore';

export default createStore({
  modules: {
    todos: useTodosStore,
  },
});
