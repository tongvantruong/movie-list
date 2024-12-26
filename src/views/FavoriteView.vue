<script setup lang="ts">
import MovieItem from '@/components/MovieItem.vue'
import { Movie } from '@/models/Movie'
import { ref, type Ref, watch, computed, type ComputedRef, toRef } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { DEFAULT_START_PAGE, PER_PAGE } from '@/const/pagination'
import NoMovie from '@/components/NoMovie.vue'
import { favoriteStore } from '@/stores/favorite'
import { DEBOUNCE_WITHOUT_API_TIME } from '@/const/debouce'

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

function onSearch() {
  page.value = DEFAULT_START_PAGE
  moviesToShow.value = favoriteMovies.value.filter((it) => it.title.includes(searchedText.value))
}

const debouncedOnSearch = useDebounceFn(onSearch, DEBOUNCE_WITHOUT_API_TIME)
</script>

<template>
  <div class="favorite-view pb-16">
    <section v-if="totalPages > 1" class="text-center">
      <VPagination
        v-model="page"
        :length="totalPages"
        :total-visible="6"
        :show-first-last-page="true"
        rounded="circle"
      ></VPagination>
    </section>
    <section>
      <NoMovie v-if="moviesToShow.length <= 0">No favorite movie found</NoMovie>
      <ul v-else class="favorite-view__movie-list">
        <MovieItem
          v-for="movie in moviesToShow.slice((page - 1) * PER_PAGE, page * PER_PAGE)"
          :key="`${movie.imdbId}-${movie.year}`"
          :movie="movie"
        />
      </ul>
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

.favorite-view__movie-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 600px;
}
</style>
