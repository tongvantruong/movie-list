<template>
  <v-text-field
    prepend-inner-icon="mdi-magnify"
    density="comfortable"
    variant="solo"
    placeholder="Search by Title"
    hide-details
    min-width="300px"
    single-line
    clearable
    @input="emits('input')"
    @click:clear="model = ''"
    v-model="model"
  />
</template>
<script setup lang="ts">
import { type Ref } from 'vue'
const model: Ref<string> = defineModel({ type: String, default: '' })
const emits = defineEmits<{
  input: []
}>()
</script>
<style scoped lang="scss"></style>
