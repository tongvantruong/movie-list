<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Layout } from '@/types/router.type'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import FavoriteLayout from '@/layouts/FavoriteLayout.vue'
import { globalErrorStore } from '@/stores/global-error'
import ErrorDialog from '@/components/ErrorDialog.vue'

const route = useRoute()

const layout = computed(() => {
  switch (route.meta.layout) {
    case Layout.Favorites:
      return FavoriteLayout
    default:
      return DefaultLayout
  }
})

const { show } = globalErrorStore()
</script>

<template>
  <component :is="layout" />
  <Teleport to="body">
    <ErrorDialog v-model="show" />
  </Teleport>
</template>
