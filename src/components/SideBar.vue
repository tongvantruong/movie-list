<template>
  <nav class="side-bar" data-cy="side-bar-nav">
    <RouterLink class="side-bar__logo" to="/"><SiteLogo /></RouterLink>
    <VTabs
      direction="vertical"
      class="cursor-pointer side-bar__tabs"
      :color="Colors.Primary"
      :slider-color="Colors.Primary"
    >
      <VTab
        class="side-bar__text pr-xs-0 pr-sm-10 pr-md-16 pr-lg-16"
        :value="1"
        to="/movies"
        prepend-icon="mdi-filmstrip"
      >
        Movies
      </VTab>
      <VTab class="side-bar__text" :value="2" to="/favorites" prepend-icon="mdi-movie-star-outline">
        Favorites
      </VTab>
    </VTabs>
  </nav>
</template>

<script setup lang="ts">
import { Colors } from '@/const/colors'
import SiteLogo from '@/components/SiteLogo.vue'
import { RouterLink } from 'vue-router'
</script>

<style lang="scss">
.side-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-right: solid 1px $colorBorder;
  background-color: $colorWhite;

  &__logo {
    padding: 20px 24px 20px 16px;
  }

  &__text {
    cursor: pointer;
  }
}
</style>
