<template>
  <div class="app">
    <h1>Список дел:</h1>
    <TodoForm />
    <Loader v-if="showInitialLoader" />
    <div v-else-if="error" class="error">{{ error }}</div>
    <TodoList v-else :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTodosActions, useTodosGetters } from '@features/todos/store';
import TodoList from '@features/todos/components/todoList/TodoList.vue';
import TodoForm from '@features/todos/components/todoForm/TodoForm.vue';
import Loader from '@shared/ui/components/loader/Loader.vue';

const { fetchTodos } = useTodosActions();
const { todos, error } = useTodosGetters();

const showInitialLoader = ref(true);

onMounted(async () => {
  await fetchTodos();
  showInitialLoader.value = false;
});
</script>

<style lang="scss">
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
