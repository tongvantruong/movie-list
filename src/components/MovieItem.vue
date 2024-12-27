<template>
  <VCard class="movie-item card-shadow" @dblclick="toggleStar" v-ripple="{ class: 'text-warn' }">
    <template #title>
      <div class="d-flex justify-space-between ga-2">
        <span class="movie-item__title">{{ movie.title }}</span>
        <VTooltip location="bottom">
          <template v-slot:activator="{ props }">
            <VBtn
              class="movie-item__icon"
              data-cy="movie-item-icon"
              v-bind="props"
              :icon="iconStar"
              variant="text"
              @click="toggleStar"
            />
          </template>
          <span data-cy="movie-item-tooltip" v-html="tooltipForStarIcon"></span>
        </VTooltip>
      </div>
    </template>
    <template #subtitle>
      <div class="d-flex justify-space-between ga-2">
        <span test-id="movie-item-year">
          Year: <i>{{ movie.year }}</i>
        </span>
        <span test-id="movie-item-imdbid">
          IMDb ID: <i>{{ movie.imdbId }}</i>
        </span>
      </div>
    </template>
  </VCard>
</template>

<script setup lang="ts">
import type { Movie } from '@/models/Movie'
import { favoriteStore } from '@/stores/favorite'
import { computed, ref, type PropType, type ComputedRef, type Ref } from 'vue'

const { movie } = defineProps({
  movie: { type: Object as PropType<Movie>, required: true },
})

console.log('CHild')

const { like, unlike, isLiked } = favoriteStore()

const isStarred: Ref<boolean> = ref(isLiked(movie.imdbId))

const iconStar: ComputedRef<string> = computed(() =>
  isStarred.value ? 'mdi-star' : 'mdi-star-outline',
)

const tooltipForStarIcon: ComputedRef<string> = computed(() => {
  const action = isStarred.value ? 'Remove it from' : 'Save it to'
  return `${action} 'FAVORITES' section. There are several ways:<br/> \
    - Click on the star icon here<br/> \
    - Double tap on the Movie item`
})

function toggleStar() {
  isStarred.value = !isStarred.value

  if (isStarred.value) like(movie)
  else unlike(movie.imdbId)
}
</script>

<style lang="scss" scoped>
.movie-item {
  width: 100%;

  &:hover {
    background-color: $colorHover;
  }
}

.movie-item__icon {
  color: $colorPrimary;
}

.movie-item__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: wrap;
  text-align: start;
}
</style>
