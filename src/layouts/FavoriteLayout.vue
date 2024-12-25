<template>
  <div class="favorite-layout">
    <TopBar class="favorite-layout__top-bar">
      <SearchInput
        class="top-bar__search"
        v-model="searchedText"
        @input="resetPage"
        @clear="resetPage"
      />
    </TopBar>
    <SideBar class="favorite-layout__side-bar" />
    <main class="favorite-layout__main" id="main">
      <RouterView v-slot="{ Component }" :searchedText="searchedText">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
    <BottomBar class="favorite-layout__bottom-bar" />
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import SearchInput from '@/components/SearchInput.vue'
import BottomBar from '@/components/BottomBar.vue'
import SideBar from '@/components/SideBar.vue'
import { useSearchData } from '@/composables/useSearchData'
import { DEFAULT_START_PAGE } from '@/const/pagination'
import { SESSION_KEY_SEARCH_DATA_FAVORITES } from '@/const/key'
import { type Ref, ref } from 'vue'

const { setSearchData, searchedText: searchedTextInSession } = useSearchData(
  SESSION_KEY_SEARCH_DATA_FAVORITES,
)

const searchedText: Ref<string> = ref(searchedTextInSession || '')

function resetPage() {
  setSearchData({ page: DEFAULT_START_PAGE })
}
</script>

<style lang="scss">
.favorite-layout {
  height: 100vh;
  background-color: $colorBackground;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 'side header' 'side main' 'side footer';
}

.favorite-layout__top-bar {
  grid-area: header;
}

.favorite-layout__side-bar {
  grid-area: side;
  overflow: auto;
}

.favorite-layout__main {
  padding: 24px;
  overflow: auto;
  grid-area: main;
}

.favorite-layout__bottom-bar {
  grid-area: footer;
}
</style>
