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
      @input="onInput"
      @click:clear="onClear"
      v-model="model"
    />
  </div>
</template>
<script setup lang="ts">
import { type Ref } from 'vue'
import { useSearchData } from '@/composables/useSearchData'
import { DEFAULT_START_PAGE } from '@/const/pagination'

const { setData } = useSearchData()

const model: Ref<string> = defineModel({ type: String, default: '' })

function onClear() {
  model.value = ''
  resetPage()
}

function onInput() {
  resetPage()
}

function resetPage() {
  setData({ page: DEFAULT_START_PAGE })
}
</script>
<style scoped lang="scss"></style>
