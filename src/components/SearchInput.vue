<template>
  <div class="search-input">
    <VTextField
      test-id="search-input"
      data-cy="search-input"
      rounded
      prepend-inner-icon="mdi-magnify"
      density="comfortable"
      variant="solo"
      placeholder="Search by Title (case sensitive)"
      hide-details
      single-line
      max-width="500px"
      clearable
      @input="emit('input')"
      @click:clear="onClear"
      v-model="model"
    />
  </div>
</template>
<script setup lang="ts">
import { type ModelRef } from 'vue'

const model: ModelRef<string> = defineModel({ type: String, default: '' })
const emit = defineEmits<{
  input: []
  clear: []
}>()

function onClear() {
  model.value = ''
  emit('clear')
}
</script>

<style scoped lang="scss">
.search-input {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
