<template>
  <div class="todo-item">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleCompleted"
      />
      <div>
        <h3 :class="{ completed: todo.completed }">{{ todo.title }}</h3>
        <p v-if="todo.description">{{ todo.description }}</p>
        <small>{{ todo.createdAt.toLocaleDateString() }}</small>
      </div>
    </div>
    <button @click="handleDelete">Delete</button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import type { Todo, TodoInput } from '@features/todos/types';

const props = defineProps<{
  todo: Todo;
}>();

const store = useStore();

const toggleCompleted = () => {
  store.dispatch('todos/updateTodo', {
    id: props.todo.id,
    updates: { completed: !props.todo.completed } as Partial<TodoInput>,
  });
};

const handleDelete = () => {
  store.dispatch('todos/deleteTodo', props.todo.id);
};
</script>

<style>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.todo-content {
  display: flex;
  gap: 10px;
  align-items: center;
}
.completed {
  text-decoration: line-through;
  color: #6c757d;
}
button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}
</style>
