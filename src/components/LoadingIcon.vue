<template>
  <div>
    <slot>
      <p class="pa-4">{{ text }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, default: 'Loading...' },
})
</script>

<style lang="scss" scoped></style>
