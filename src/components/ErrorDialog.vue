<template>
  <VDialog v-model="dialog" width="auto">
    <VCard
      max-width="400"
      prepend-icon="mdi-alert"
      text="Please try again later or contact Administrator for support!"
      title="Something went wrong!"
    >
      <template v-slot:actions>
        <VBtn class="ms-auto" text="Ok" @click="dialog = false"></VBtn>
      </template>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { ModelRef } from 'vue'

const dialog: ModelRef<boolean> = defineModel({ type: Boolean, default: false })
</script>
