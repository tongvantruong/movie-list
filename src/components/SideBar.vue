<template>
  <header class="side-bar">
    <nav class="side-bar__nav">
      <RouterLink class="side-bar__logo" to="/"><SiteLogo /></RouterLink>
      <VTabs
        direction="vertical"
        class="cursor-pointer side-bar__tabs"
        :color="Colors.Primary"
        :slider-color="Colors.Primary"
      >
        <VTab class="side-bar__text" :value="1" to="/movies" prepend-icon="mdi-filmstrip">
          Movies
        </VTab>
        <VTab
          class="side-bar__text"
          :value="2"
          to="/favorites"
          prepend-icon="mdi-movie-star-outline"
        >
          Favorites
        </VTab>
      </VTabs>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Colors } from '@/const/colors'
import SiteLogo from '@/components/SiteLogo.vue'
import { RouterLink } from 'vue-router'
</script>

<style lang="scss">
.side-bar {
  border-right: solid 1px $colorBorder;
  background-color: $colorWhite;
}

.side-bar__nav {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.side-bar__logo {
  padding: 20px 24px 20px 16px;
}

.side-bar__text {
  cursor: pointer;
  padding-right: 60px !important;
}
</style>
