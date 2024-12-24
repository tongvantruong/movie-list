<script setup lang="ts">
import MovieItem from '@/components/MovieItem.vue'
import { computed, onMounted, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { ApiMovie } from '@/apis/movies'
import type { MoviesPerPage } from '@/models/MoviesPerPage'
import LoadingIcon from '@/components/LoadingIcon.vue'
import { useDebounceFn } from '@vueuse/core'
import NoMovie from '@/components/NoMovie.vue'
import { DEFAULT_START_PAGE } from '@/const/api'

type CachedKey = string
const cachedMoviesPerPage = new Map<CachedKey, MoviesPerPage>()

const page: Ref<number> = ref(DEFAULT_START_PAGE)
const searchedText: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(false)
const moviesPerPage: Ref<MoviesPerPage | undefined> = ref(undefined)

const cachedKey: ComputedRef<CachedKey> = computed(() => `${searchedText.value}-${page.value}`)

onMounted(() => {
  fetchMovies()
})

async function fetchMovies() {
  isLoading.value = true

  try {
    moviesPerPage.value = await ApiMovie.search(searchedText.value, page.value)
    cachedMoviesPerPage.set(cachedKey.value, moviesPerPage.value)
  } catch (error: unknown) {
    moviesPerPage.value = undefined
    cachedMoviesPerPage.delete(cachedKey.value)
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const debouncedFetchMovies = useDebounceFn(fetchMovies, 200)

function onInputChange() {
  if (isLoading.value) return
  page.value = DEFAULT_START_PAGE

  if (cachedMoviesPerPage.get(cachedKey.value)) {
    moviesPerPage.value = cachedMoviesPerPage.get(cachedKey.value)
    isLoading.value = false
    return
  }

  debouncedFetchMovies()
}

function onPageChange() {
  if (isLoading.value) return

  if (cachedMoviesPerPage.get(cachedKey.value)) {
    moviesPerPage.value = cachedMoviesPerPage.get(cachedKey.value)
    isLoading.value = false
    return
  }

  debouncedFetchMovies()
}
</script>

<template>
  <div class="home-view pb-16">
    <section class="home-view__section home-view__search">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        density="comfortable"
        variant="solo"
        placeholder="Search by Title"
        hide-details
        min-width="300px"
        single-line
        v-model="searchedText"
        @input="onInputChange"
      ></v-text-field>
    </section>
    <section class="text-center" v-if="moviesPerPage && moviesPerPage?.total > 0">
      <v-pagination
        v-model="page"
        :length="moviesPerPage.totalPages"
        :total-visible="6"
        :show-first-last-page="true"
        rounded="circle"
        @update:modelValue="onPageChange"
      ></v-pagination>
    </section>
    <section>
      <LoadingIcon v-if="isLoading">
        <v-progress-circular indeterminate :size="30"></v-progress-circular>
      </LoadingIcon>
      <div v-else>
        <NoMovie v-if="!moviesPerPage || moviesPerPage?.total <= 0" />
        <ul v-else class="home-view__movie-list">
          <MovieItem
            v-for="movie in moviesPerPage?.data"
            :key="`${movie.imdbId}-${movie.year}`"
            :movie="movie"
          />
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home-view {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
}

.home-view__movie-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
}
</style>
