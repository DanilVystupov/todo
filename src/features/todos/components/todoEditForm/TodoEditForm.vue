<template>
  <form
    class="todo-edit-form"
    @submit.prevent="handleSubmit"
    :data-submitting="loading"
  >
    <input
      v-model="localTitle"
      name="title"
      class="todo-edit-form__input"
      required
      placeholder="Заголовок*"
    />

    <textarea
      v-model="localDescription"
      name="description"
      class="todo-edit-form__textarea"
      placeholder="Описание"
    ></textarea>

    <div class="todo-edit-form__actions">
      <div>
        <Spinner v-if="loading" />
        <button
          v-else
          type="submit"
          class="todo-edit-form__button todo-edit-form__button--save"
        >
          💾 Сохранить
        </button>
      </div>

      <button
        type="button"
        class="todo-edit-form__button todo-edit-form__button--cancel"
        @click="$emit('cancel')"
      >
        ❌ Отмена
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Spinner from '@/shared/ui/components/spinner/Spinner.vue';

type Props = {
  title: string;
  description?: string;
  loading: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'save', payload: { title: string; description?: string }): void;
  (e: 'cancel'): void;
}>();

const localTitle = ref(props.title);
const localDescription = ref(props.description ?? '');

watch(() => props.title, (val) => (localTitle.value = val));
watch(() => props.description, (val) => (localDescription.value = val ?? ''));

const handleSubmit = () => {
  emit('save', {
    title: localTitle.value.trim(),
    description: localDescription.value,
  });
};
</script>

<style lang="scss" scoped>
.todo-edit-form {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &[data-submitting='true'] {
    opacity: 0.7;
    pointer-events: none;
  }

  &__input,
  &__textarea {
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

  &__actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__button {
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

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
  }
}
</style>
