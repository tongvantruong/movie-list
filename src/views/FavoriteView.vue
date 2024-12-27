<script setup lang="ts">
import MovieItem from '@/components/MovieItem.vue'
import { Movie } from '@/models/Movie'
import { ref, type Ref, watch, computed, type ComputedRef, toRef } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { DEFAULT_START_PAGE, PER_PAGE } from '@/const/pagination'
import NoMovie from '@/components/NoMovie.vue'
import { favoriteStore } from '@/stores/favorite'
import { DEBOUNCE_WITHOUT_API_TIME } from '@/const/debounce'

const props = defineProps({
  searchedText: { type: String, default: '' },
})

const searchedText: Ref<string> = toRef(props, 'searchedText', '')
const page: Ref<number> = ref(DEFAULT_START_PAGE)

const { favoriteMovies } = favoriteStore()
const moviesToShow: Ref<Movie[]> = ref(favoriteMovies.value)

const totalPages: ComputedRef<number> = computed(() => Math.ceil(moviesToShow.value.length / 10))

watch([searchedText, favoriteMovies], () => {
  debouncedOnSearch()
})

watch(page, () => {
  scrollToTop()
})

function scrollToTop() {
  document.getElementById('main')?.scrollTo(0, 0)
}

function onSearch() {
  page.value = DEFAULT_START_PAGE
  moviesToShow.value = favoriteMovies.value.filter((it) => it.title.includes(searchedText.value))
}

const debouncedOnSearch = useDebounceFn(onSearch, DEBOUNCE_WITHOUT_API_TIME)
</script>

<template>
  <div class="favorite-view pb-16">
    <section class="favorite-view__section">
      <NoMovie v-if="moviesToShow.length <= 0">No favorite movie found</NoMovie>
      <ul v-else class="favorite-view__movie-list">
        <MovieItem
          v-for="movie in moviesToShow.slice((page - 1) * PER_PAGE, page * PER_PAGE)"
          :key="`${movie.imdbId}-${movie.year}`"
          :movie="movie"
        />
      </ul>
    </section>
    <section
      v-if="totalPages > 1"
      class="text-center favorite-view__section favorite-view__pagination"
    >
      <VPagination
        v-model="page"
        :length="totalPages"
        :total-visible="6"
        :show-first-last-page="true"
        rounded="circle"
      ></VPagination>
    </section>
  </div>
</template>

<style scoped lang="scss">
.favorite-view {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
}

.favorite-view__section {
  width: 100%;
  text-align: center;
}

.favorite-view__pagination {
  overflow-x: auto;
  display: grid;
}

.favorite-view__movie-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
