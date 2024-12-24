<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Layout } from '@/types/router.type'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import FavoriteLayout from '@/layouts/FavoriteLayout.vue'

const route = useRoute()

const layout = computed(() => {
  switch (route.meta.layout) {
    case Layout.Favorite:
      return FavoriteLayout
    default:
      return DefaultLayout
  }
})
</script>

<template>
  <component :is="layout" />
</template>
