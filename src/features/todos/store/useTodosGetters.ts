import { computed } from 'vue';
import { useStore } from 'vuex';
import type { TodosStoreState } from './types';
import type { RootState } from '@/store';

export const useTodosGetters = () => {
  const store = useStore<RootState>();

  const todos = computed(() => store.getters['todos/todos'] as TodosStoreState['todos']);
  const isLoading = computed(() => store.getters['todos/isLoading'] as boolean);
  const error = computed(() => store.getters['todos/error'] as string | null);

  return {
    todos,
    isLoading,
    error,
  };
};
