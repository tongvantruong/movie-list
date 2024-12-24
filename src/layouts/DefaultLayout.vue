<template>
  <div class="default-layout">
    <TopBar class="default-layout__top-bar" />
    <main class="default-layout__main">
      <router-view v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
}

.default-layout__top-bar {
  display: flex;
}

.default-layout__main {
  display: flex;
  padding: 24px;
}
</style>
