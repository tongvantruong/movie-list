<template>
  <VCard
    class="movie-item card-shadow"
    role="listitem"
    @dblclick="toggleStar"
    v-ripple="{ class: 'text-warn' }"
  >
    <template #title>
      <div class="d-flex justify-space-between ga-2">
        <span class="movie-item__title">{{ movie.title }}</span>
        <VTooltip location="bottom" role="tooltip" aria-label="favorite">
          <template v-slot:activator="{ props }">
            <VBtn
              title="Star"
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { movie } = defineProps({
  movie: { type: Object as PropType<Movie>, required: true },
})

const { like, unlike, isLiked } = favoriteStore()

const isStarred: Ref<boolean> = ref(isLiked(movie.imdbId))

const iconStar: ComputedRef<string> = computed(() =>
  isStarred.value ? 'mdi-star' : 'mdi-star-outline',
)

const tooltipForStarIcon: ComputedRef<string> = computed(() => {
  return t('favorite_tooltip')
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

  &__icon {
    color: $colorPrimary;
  }

  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: wrap;
    text-align: start;
  }
}
</style>
