<template>
  <div class="favorite-layout">
    <TopBar class="favorite-layout__top-bar" />
    <main class="favorite-layout__main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
</script>

<style lang="scss">
.favorite-layout {
  display: flex;
  flex-direction: column;
}

.favorite-layout__top-bar {
  display: flex;
}

.favorite-layout__main {
  display: flex;
  padding: 24px;
}
</style>
