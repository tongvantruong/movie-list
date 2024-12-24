<template>
  <v-card @dblclick="toggleStar" v-ripple>
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
import type { Movie } from '@/models/Movie'
import type { PropType, ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'

defineProps({
  movie: { type: Object as PropType<Movie>, required: true },
})

const isStared: Ref<boolean> = ref(false)

const startIcon: ComputedRef<string> = computed(() =>
  isStared.value ? 'mdi-star' : 'mdi-star-outline',
)

function toggleStar() {
  isStared.value = !isStared.value
}
</script>

<style lang="scss" scoped>
.movie-item__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: wrap;
}
</style>
