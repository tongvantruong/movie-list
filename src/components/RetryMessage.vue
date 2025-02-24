<template>
  <div class="retry-message pt-4" data-cy="retry-message">
    <slot>
      <h2 class="retry-message__title">{{ title }}</h2>
      <p>{{ detail }}</p>
      <p>
        <i>{{ error }}</i>
      </p>
      <VBtn class="ma-4 retry-message__button" variant="flat" @click="() => emit('retry')"
        >Retry</VBtn
      >
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Something went wrong!' },
  detail: { type: String, default: 'We could not fetch the movies. Please check and try again!' },
  error: { type: String, default: 'Unknown Error' },
})
const emit = defineEmits<{
  retry: []
}>()
</script>

<style scoped lang="scss">
.retry-message {
  line-height: 1.5;

  &__title {
    color: $colorPrimary;
  }

  &__button {
    background-color: $colorPrimary;
    color: $colorWhite;
  }
}
</style>
