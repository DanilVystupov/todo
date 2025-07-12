<template>
  <div class="app">
    <h1>Список дел:</h1>
    <TodoForm />
    <Loader v-if="isLoading" />
    <div v-else-if="error" class="error">{{ error }}</div>
    <TodoList v-else :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import TodoList from '@features/todos/components/todoList/TodoList.vue';
import TodoForm from '@features/todos/components/todoForm/TodoForm.vue';
import Loader from '@shared/ui/components/loader/Loader.vue';
import type { Todo } from '@features/todos/types';

const store = useStore();
const todos = computed(() => store.getters['todos/todos'] as Todo[]);
const isLoading = computed(() => store.getters['todos/isLoading'] as boolean);
const error = computed(() => store.getters['todos/error'] as string | null);

onMounted(() => {
  store.dispatch('todos/fetchTodos');
});
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.error {
  color: red;
  text-align: center;
}
</style>
