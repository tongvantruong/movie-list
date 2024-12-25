<script setup lang="ts">
import MovieItem from '@/components/MovieItem.vue'
import { ref, type Ref, toRef, watch } from 'vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import NoMovie from '@/components/NoMovie.vue'
import { DEFAULT_START_PAGE } from '@/const/pagination'
import { useMovies } from '@/composables/useMovies'
import { useSearchData } from '@/composables/useSearchData'
import { SESSION_KEY_SEARCH_DATA_DEFAULT } from '@/const/key'

const props = defineProps({
  searchedText: { type: String, default: '' },
})

const { searchDataRef } = useSearchData(SESSION_KEY_SEARCH_DATA_DEFAULT)
const page: Ref<number> = ref(searchDataRef.value.page || DEFAULT_START_PAGE)
const { isLoading, moviesPerPage } = useMovies(toRef(props, 'searchedText', ''), page)

watch(searchDataRef, () => {
  page.value = searchDataRef.value.page
})
</script>

<template>
  <div class="home-view pb-16">
    <section>
      <LoadingSkeleton v-if="isLoading" />
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
    <section class="text-center" v-if="moviesPerPage && moviesPerPage?.totalPages > 1">
      <VPagination
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

.home-view__movie-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 600px;
}
</style>
