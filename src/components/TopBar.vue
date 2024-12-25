<template>
  <header class="top-bar">
    <SearchInput class="top-bar__search" v-model="model" />
  </header>
</template>

<script setup lang="ts">
import { type Ref } from 'vue'
import SearchInput from '@/components/SearchInput.vue'

const model: Ref<string> = defineModel({ type: String, default: '' })
</script>

<style lang="scss">
.top-bar {
  border-bottom: solid 1px #e6e6e6;
  background-color: $colorWhite;
  display: flex;
  justify-content: center;
  padding: 12px 0px;
}

.top-bar__search {
  width: 500px;
}
</style>
