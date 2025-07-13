<template>
  <form
    @submit.prevent="handleSubmit"
    class="todo-form"
    :data-submitting="isSubmitting"
  >
    <input
      v-model="form.title"
      type="text"
      name="title"
      placeholder="Заголовок*"
      required
      class="todo-form__input"
    />

    <textarea
      v-model="form.description"
      name="description"
      placeholder="Описание"
      class="todo-form__textarea"
    ></textarea>

    <button
      type="submit"
      class="todo-form__button"
      :class="{ 'todo-form__button--submitting': isSubmitting }"
    >
      <Spinner v-if="isSubmitting"/>
      <span v-else>➕ Добавить задачу</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TodoInput } from '@features/todos/types';
import { useTodosActions } from '@features/todos/store';
import Spinner from '@shared/ui/components/spinner/Spinner.vue';

const { addTodo } = useTodosActions();
const form = ref<TodoInput>({ title: '', description: '' });
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if (!form.value.title.trim()) return;

  isSubmitting.value = true;
  await addTodo({ ...form.value });

  form.value.title = '';
  form.value.description = '';

  isSubmitting.value = false;
};
</script>

<style lang="scss">
.todo-form {
  display: flex; 
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: background-color 0.2s ease;

  &[data-submitting="true"] {
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

  &--submitting {
    background-color: #f0f0f0;;
    cursor: not-allowed;
  }
}
</style>
