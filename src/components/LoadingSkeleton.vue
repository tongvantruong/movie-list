<template>
  <div class="loading-skeleton" data-cy="loading-skeleton">
    <slot>
      <VCard :key="index" v-for="(_, index) in new Array(size)">
        <template #title>
          <v-skeleton-loader type="list-item-two-line" width="100%" />
        </template>
      </VCard>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  size: { type: Number, default: 10 },
})
</script>

<style lang="scss" scoped>
.loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 600px;
}
</style>
