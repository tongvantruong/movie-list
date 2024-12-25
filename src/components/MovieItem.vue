<template>
  <v-card class="movie-item" @dblclick="toggleStar" v-ripple>
    <template #title>
      <div class="d-flex justify-space-between ga-2">
        <span class="movie-item__title">{{ movie.title }}</span>
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              color="blue-lighten-2"
              v-bind="props"
              :icon="iconStar"
              variant="text"
              @click="toggleStar"
            />
          </template>
          <span v-html="tooltipForStarIcon"></span>
        </v-tooltip>
      </div>
    </template>
    <template #subtitle>
      <div class="d-flex justify-space-between ga-2">
        <span>
          Year: <i>{{ movie.year }}</i>
        </span>
        <span>
          IMDb ID: <i>{{ movie.imdbId }}</i>
        </span>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { useFavorites } from '@/composables/useFavorites'
import type { Movie } from '@/models/Movie'
import { computed, ref, type PropType, type ComputedRef, type Ref } from 'vue'

const props = defineProps({
  movie: { type: Object as PropType<Movie>, required: true },
})

const { star, unStar, isStared } = useFavorites()

const stared: Ref<boolean> = ref(isStared(props.movie))

const iconStar: ComputedRef<string> = computed(() =>
  stared.value ? 'mdi-star' : 'mdi-star-outline',
)

const tooltipForStarIcon: ComputedRef<string> = computed(() => {
  const action = stared.value ? 'Remove it from' : 'Save it to'
  return `${action} 'FAVORITES' section. There are several ways:<br/> \
    - Click on the star icon here<br/> \
    - Double tap on the Movie item`
})

function toggleStar() {
  stared.value = !stared.value

  if (stared.value) star(props.movie)
  else unStar(props.movie)
}
</script>

<style lang="scss" scoped>
.movie-item {
  width: 100%;
}

.movie-item__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: wrap;
}
</style>
