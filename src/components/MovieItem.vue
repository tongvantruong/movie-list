<template>
  <v-card class="movie-item" @dblclick="toggleStar" v-ripple>
    <template v-slot:title>
      <div class="d-flex justify-space-between ga-2">
        <span class="movie-item__title">{{ movie.title }}</span>
        <v-btn color="blue-lighten-2" :icon="startIcon" variant="text" @click="toggleStar"></v-btn>
      </div>
    </template>
    <template v-slot:subtitle>
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

const startIcon: ComputedRef<string> = computed(() =>
  isStared(props.movie) ? 'mdi-star' : 'mdi-star-outline',
)

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
