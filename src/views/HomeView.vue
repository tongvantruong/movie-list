<script setup lang="ts">
import MovieItem from '@/components/MovieItem.vue'
import { ref, type Ref, toRef, watch } from 'vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import RetryMessage from '@/components/RetryMessage.vue'
import NoMovie from '@/components/NoMovie.vue'
import { DEFAULT_START_PAGE } from '@/const/pagination'
import { useMovies } from '@/composables/useMovies'
import { useSearchData } from '@/composables/useSearchData'
import { SESSION_KEY_SEARCH_DATA_DEFAULT } from '@/const/key'

const props = defineProps({
  searchedText: { type: String, default: '' },
})

const { page: sessionPage } = useSearchData(SESSION_KEY_SEARCH_DATA_DEFAULT)
const page: Ref<number> = ref(sessionPage.value || DEFAULT_START_PAGE)
const { error, isLoading, moviesPerPage, fetchMovies } = useMovies(toRef(props, 'searchedText', ''), page)

watch(sessionPage, () => {
  page.value = sessionPage.value
})
</script>

<template>
  <div class="home-view pb-16">
    <section class="home-view__section">
      <LoadingSkeleton v-if="isLoading" />
      <div class="text-center" v-else>
        <RetryMessage v-if="error" :error="error.message || undefined" @retry="fetchMovies" />
        <NoMovie v-else-if="!moviesPerPage || moviesPerPage?.total <= 0" />
        <ul v-else class="home-view__movie-list" data-cy="home-view-movie-list">
          <MovieItem
            v-for="movie in moviesPerPage?.data"
            :key="`${movie.imdbId}-${movie.year}`"
            :movie="movie"
          />
        </ul>
      </div>
    </section>
    <section
      class="text-center home-view__section home-view__pagination"
      v-if="moviesPerPage && moviesPerPage?.totalPages > 1"
    >
      <VPagination
        data-cy="home-view-pagination"
        v-model="page"
        :length="moviesPerPage.totalPages"
        :total-visible="6"
        :show-first-last-page="true"
        :disabled="isLoading"
        rounded="circle"
      />
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

.home-view__section {
  width: 100%;
}

.home-view__pagination {
  overflow-x: auto;
  display: grid;
}

.home-view__movie-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
