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
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  width: 100%;
  max-width: 100vw;
}

.favorite-layout__top-bar {
  grid-column: 1 / 3;
}

.favorite-layout__main {
  grid-column: 2;
  grid-row: 2;
}
</style>
