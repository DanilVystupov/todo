<template>
  <div class="todo-item">
    <div class="todo-item__left">
      <input
        v-if="!isEditMode"
        type="checkbox"
        class="todo-item__checkbox"
        :checked="todo.completed"
        @change="toggleCompleted"
      />

      <div class="todo-item__content">
        <div v-if="!isEditMode">
          <h3
            class="todo-item__title"
            :class="{ 'todo-item__title--completed': todo.completed }"
          >
            {{ todo.title }}
          </h3>

          <p v-if="todo.description" class="todo-item__description">
            {{ todo.description }}
          </p>

          <small class="todo-item__date">
            {{ todo.createdAt.toLocaleDateString() }}
          </small>
        </div>

        <TodoEditForm
          v-else
          :title="todo.title"
          :description="todo.description"
          :loading="isSubmitting"
          @save="saveEdit"
          @cancel="cancelEdit"
        />
      </div>
    </div>

    <div
      v-if="!isEditMode"
      class="todo-item__actions"
    >
      <button
        class="todo-item__button todo-item__button--edit"
        @click="startEdit"
      >
        ✏️ Редактировать
      </button>

      <div>
        <Spinner v-if="isSubmitting" />
        <button
          v-else
          class="todo-item__button todo-item__button--delete"
          @click="handleDelete"
        >
          🗑 Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '@features/todos/types';
import { useTodosActions } from '@features/todos/store';
import Spinner from '@/shared/ui/components/spinner/Spinner.vue';
import TodoEditForm from '@features/todos/components/todoEditForm/TodoEditForm.vue';

const props = defineProps<{ todo: Todo }>();
const { updateTodo, deleteTodo } = useTodosActions();

const isEditMode = ref(false);
const isSubmitting = ref(false);

const toggleCompleted = async () => {
  await updateTodo(props.todo.id, { completed: !props.todo.completed });
};

const startEdit = () => {
  isEditMode.value = true;
};

const cancelEdit = () => {
  isEditMode.value = false;
};

const saveEdit = async ({ title, description }: { title: string; description?: string }) => {
  isSubmitting.value = true;

  await updateTodo(props.todo.id, { title, description });

  isSubmitting.value = false;
  isEditMode.value = false;
};

const handleDelete = async () => {
  isSubmitting.value = true;
  await deleteTodo(props.todo.id);
  isSubmitting.value = false;
};
</script>

<style lang="scss">
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 10px;
  gap: 10px;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  }
}

.todo-item__left {
  display: flex;
  gap: 16px;
  flex: 1;
}

.todo-item__checkbox {
  width: 20px;
  height: 20px;
  margin-top: 4px;
  accent-color: #007bff;
}

.todo-item__content {
  flex: 1;
}

.todo-item__title {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #333;

  &--completed {
    text-decoration: line-through;
    color: #aaa;
  }
}

.todo-item__description {
  margin: 0 0 6px;
  color: #555;
}

.todo-item__date {
  font-size: 10px;
  color: #999;
}

.todo-item__input,
.todo-item__textarea {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;

  &:focus-visible {
    outline: none;
    border-color: #007bff;
  }
}

.todo-item__actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.todo-item__button {
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &--edit {
    background-color: #f0f0f0;
    color: #333;

    &:hover {
      background-color: #e2e2e2;
    }
  }

  &--delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }
}
</style>
