<script setup lang="ts">
import MovieItem from '@/components/MovieItem.vue'
import { ref, type Ref } from 'vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import NoMovie from '@/components/NoMovie.vue'
import { DEFAULT_START_PAGE } from '@/const/pagination'
import { useMovies } from '@/composables/useMovies'
import { useSearchData } from '@/composables/useSearchData'
import SearchInput from '@/components/SearchInput.vue'

const { searchedText: sessionSearchedText, page: sessionPage } = useSearchData()
const page: Ref<number> = ref(sessionPage || DEFAULT_START_PAGE)
const searchedText: Ref<string> = ref(sessionSearchedText || '')
const { isLoading, moviesPerPage } = useMovies(searchedText, page)

function onInputChange() {
  if (isLoading.value) return
  page.value = DEFAULT_START_PAGE
}
</script>

<template>
  <div class="home-view pb-16">
    <section class="home-view__section home-view__search">
      <SearchInput @input="onInputChange" v-model="searchedText" />
    </section>
    <section class="text-center" v-if="moviesPerPage && moviesPerPage?.totalPages > 1">
      <v-pagination
        v-model="page"
        :length="moviesPerPage.totalPages"
        :total-visible="6"
        :show-first-last-page="true"
        :disabled="isLoading"
        rounded="circle"
      />
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
  min-width: 400px;
}
</style>
