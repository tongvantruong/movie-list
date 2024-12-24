<template>
  <div class="favorite-view pb-16">
    <section>
      <ul class="favorite-view__movie-list">
        <MovieItem
          v-for="movie in staredMoviesRef"
          :key="`${movie.imdbId}-${movie.year}`"
          :movie="movie"
        />
      </ul>
    </section>
    <section class="text-center">
      <v-pagination v-model="page" :length="5" :total-visible="7"></v-pagination>
    </section>
  </div>
</template>

<script setup lang="ts">
import MovieItem from '@/components/MovieItem.vue'
import { useFavorites } from '@/composables/useFavorites'
import { ref, type Ref } from 'vue'

const page: Ref<number> = ref(2)

const { staredMoviesRef } = useFavorites()
</script>

<style scoped lang="scss">
.favorite-view {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
}

.favorite-view__movie-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
}
</style>
