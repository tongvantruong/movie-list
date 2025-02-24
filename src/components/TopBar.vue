<template>
  <header class="top-bar">
    <div class="top-bar__search"><slot></slot></div>
  </header>
</template>

<style lang="scss">
.top-bar {
  border-bottom: solid 1px $colorBorder;
  background-color: $colorWhite;
  display: flex;
  justify-content: center;
  padding: 12px 0px;

  &__search {
    width: 100%;
    padding: 0 24px;
  }
}
</style>
