<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input v-model="form.title" type="text" placeholder="Task title" required />
    <textarea
      v-model="form.description"
      placeholder="Task description"
    ></textarea>
    <!-- TODO: Не дизейблить кнопку, тк это ухудшает доступность, вместо этого прокидывать data атрибут в форму -->
    <button type="submit" :disabled="isLoading">Add Task</button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import type { TodoInput } from '@features/todos/types';

const store = useStore();
const form = ref<TodoInput>({ title: '', description: '' });
const isLoading = computed(() => store.getters['todos/isLoading']);

const handleSubmit = async () => {
  if (!form.value.title.trim()) return;
  await store.dispatch('todos/addTodo', { ...form.value });
  form.value.title = '';
  form.value.description = '';
};
</script>

<style scoped>
.todo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
input,
textarea {
  padding: 8px;
  font-size: 16px;
}
button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
}
</style>
