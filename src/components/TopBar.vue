<template>
  <header class="top-bar">
    <nav class="top-bar__nav">
      <v-card>
        <v-tabs v-model="tab" align-tabs="center" color="blue-darken-4 cursor-pointer">
          <v-tab :value="1" to="/">Movies</v-tab>
          <v-tab :value="2" to="/favorite">Favorites</v-tab>
        </v-tabs>
      </v-card>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref()
</script>

<style lang="scss">
.top-bar {
  padding: 24px 16px;
}
.top-bar__nav {
  width: 100%;
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
}
</style>
