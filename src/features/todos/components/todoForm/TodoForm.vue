<template>
  <form
    @submit.prevent="handleSubmit"
    class="todo-form"
    :data-disabled="isLoading"
  >
    <input
      v-model="form.title"
      type="text"
      class="todo-form__input"
      placeholder="Заголовок*"
      required
    />

    <textarea
      v-model="form.description"
      class="todo-form__textarea"
      placeholder="Описание"
    ></textarea>

    <button
      type="submit"
      class="todo-form__button"
      :class="{'todo-form__button--disabled': isLoading}"
    >
      ➕ Добавить задачу
    </button>
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
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: background-color 0.2s ease;

  &[data-disabled="true"] {
    opacity: 0.7;
    pointer-events: none;
  }
}

.todo-form__input,
.todo-form__textarea {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus-visible {
    outline: none;
    border-color: #007bff;
  }
}

.todo-form__button {
  align-self: flex-start;
  background-color: #007bff;
  color: white;
  font-weight: 500;
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0069d9;
  }

  &--disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
}
</style>
