<template>
  <header class="top-bar">
    <div class="top-bar__search"><slot></slot></div>
  </header>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.top-bar {
  border-bottom: solid 1px $colorBorder;
  background-color: $colorWhite;
  display: flex;
  justify-content: center;
  padding: 12px 0px;
}

.top-bar__search {
  width: 500px;
}
</style>
