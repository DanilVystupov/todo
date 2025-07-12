<template>
  <div class="todo-list">
    <TodoItem v-for="todo in props.todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script setup lang="ts">
import TodoItem from '../todoItem/TodoItem.vue';
import type { Todo } from '@features/todos/types';

const props = defineProps<{
  todos: Todo[];
}>();
</script>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
