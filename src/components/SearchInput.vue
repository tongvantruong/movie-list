<template>
  <div>
    <VTextField
      rounded
      prepend-inner-icon="mdi-magnify"
      density="comfortable"
      variant="solo"
      placeholder="Search by Title"
      hide-details
      min-width="300px"
      single-line
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
<style scoped lang="scss"></style>
