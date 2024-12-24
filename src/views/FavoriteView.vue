<template>
  <div class="favorite-view pb-16">
    <section>
      <ul class="favorite-view__movie-list">
        <MovieItem v-for="movie in mockData" :key="movie.imdbId" :movie="movie" />
      </ul>
    </section>
    <section class="text-center">
      <v-pagination v-model="page" :length="5" :total-visible="7"></v-pagination>
    </section>
  </div>
</template>

<script setup lang="ts">
import MovieItem from '@/components/MovieItem.vue'
import type { Movie } from '@/models/Movie'
import { ref, type Ref } from 'vue'

const mockData: Movie[] = [
  {
    title: 'Waterworld',
    year: 1995,
    imdbId: 'tt0114898',
  },
  {
    title: 'Waterworld',
    year: 1995,
    imdbId: 'tt0189200',
  },
  {
    title: "The Making of 'Waterworld'",
    year: 1995,
    imdbId: 'tt2670548',
  },
  {
    title: 'Waterworld 4: History of the Islands',
    year: 1997,
    imdbId: 'tt0161077',
  },
  {
    title: 'Waterworld',
    year: 1997,
    imdbId: 'tt0455840',
  },
  {
    title: 'Waterworld',
    year: 1997,
    imdbId: 'tt0390617',
  },
  {
    title: 'Swordquest: Waterworld',
    year: 1983,
    imdbId: 'tt2761086',
  },
  {
    title:
      'Behind the Scenes of the Most Fascinating Waterworld on Earth: The Great Backwaters, Kerala.',
    year: 2014,
    imdbId: 'tt5847056',
  },
  {
    title: "Louise's Waterworld",
    year: 1997,
    imdbId: 'tt0298417',
  },
  {
    title: 'Waterworld',
    year: 2001,
    imdbId: 'tt0381702',
  },
]

const page: Ref<number> = ref(2)
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
