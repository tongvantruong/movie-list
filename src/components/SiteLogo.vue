<template>
  <div class="site-logo">
    <img src="@/assets/images/favicon-32x32.png" alt="Site Logo" />
    <span>MoList</span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.site-logo {
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 900;
  cursor: pointer;
  color: $colorBlack;
  text-decoration: none;
}
</style>
