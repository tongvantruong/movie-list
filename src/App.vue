<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import type { Movie } from '@/types/movie.type'

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
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
