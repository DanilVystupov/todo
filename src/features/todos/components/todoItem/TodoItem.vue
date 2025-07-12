<template>
  <div class="todo-item">
    <div class="todo-item__left">
      <input
        type="checkbox"
        class="todo-item__checkbox"
        :checked="todo.completed"
        @change="toggleCompleted"
      />

      <div class="todo-item__content">
        <div v-if="!isEditing">
          <h3
            class="todo-item__title"
            :class="{ 'todo-item__title--completed': todo.completed }"
          >
            {{ todo.title }}
          </h3>

          <p
            v-if="todo.description"
            class="todo-item__description"
          >
            {{ todo.description }}
          </p>

          <small class="todo-item__date">{{ todo.createdAt.toLocaleDateString() }}</small>
        </div>

        <div v-else class="todo-item__edit-form">
          <input
            class="todo-item__input"
            v-model="editedTitle"
            required
          />

          <textarea
            class="todo-item__textarea"
            v-model="editedDescription"
          />
        </div>
      </div>
    </div>

    <div class="todo-item__actions">
      <template v-if="!isEditing">
        <button
          class="todo-item__button todo-item__button--edit"
          @click="startEdit"
        >
          ✏️ Редактировать
        </button>

        <button
          class="todo-item__button todo-item__button--delete"
          @click="handleDelete"
        >
          🗑 Удалить
        </button>
      </template>

      <template v-else>
        <button
          class="todo-item__button todo-item__button--save"
          @click="saveEdit"
        >
          💾 Сохранить
        </button>
        
        <button
          class="todo-item__button todo-item__button--cancel"
          @click="cancelEdit"
        >
          ❌ Отмена
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
import type { Todo, TodoInput } from '@features/todos/types';

const props = defineProps<{ todo: Todo }>();
const store = useStore();

const isEditing = ref(false);
const editedTitle = ref(props.todo.title);
const editedDescription = ref(props.todo.description || '');

const toggleCompleted = () => {
  store.dispatch('todos/updateTodo', {
    id: props.todo.id.toString(),
    updates: { completed: !props.todo.completed } as Partial<TodoInput>,
  });
};

const handleDelete = () => {
  store.dispatch('todos/deleteTodo', props.todo.id.toString());
};

const startEdit = () => {
  editedTitle.value = props.todo.title;
  editedDescription.value = props.todo.description || '';
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  editedTitle.value = props.todo.title;
  editedDescription.value = props.todo.description || '';
};

const saveEdit = () => {
  if (!editedTitle.value.trim()) return;

  store.dispatch('todos/updateTodo', {
    id: props.todo.id.toString(),
    updates: {
      title: editedTitle.value,
      description: editedDescription.value,
    } as Partial<TodoInput>,
  });

  isEditing.value = false;
};
</script>

<style scoped>
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

.todo-item__edit-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

  &--save {
    background-color: #28a745;
    color: white;

    &:hover {
      background-color: #218838;
    }
  }

  &--cancel {
    background-color: #ffc107;
    color: #333;

    &:hover {
      background-color: #e0a800;
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
