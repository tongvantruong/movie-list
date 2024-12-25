<template>
  <div class="default-layout">
    <TopBar class="default-layout__top-bar">
      <SearchInput
        class="top-bar__search"
        v-model="searchedText"
        @input="resetPage"
        @clear="resetPage"
      />
    </TopBar>
    <SideBar class="default-layout__side-bar" />
    <main class="default-layout__main" id="main">
      <RouterView v-slot="{ Component }" :searchedText="searchedText">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
    <BottomBar class="default-layout__bottom-bar" />
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue'
import BottomBar from '@/components/BottomBar.vue'
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
import { RouterView } from 'vue-router'
import SearchInput from '@/components/SearchInput.vue'
import { useSearchData } from '@/composables/useSearchData'
import { DEFAULT_START_PAGE } from '@/const/pagination'
import { SESSION_KEY_SEARCH_DATA_DEFAULT } from '@/const/key'

const { setData, searchedText: searchedTextInSession } = useSearchData(
  SESSION_KEY_SEARCH_DATA_DEFAULT,
)

const searchedText: Ref<string> = ref(searchedTextInSession || '')

function resetPage() {
  setData({ page: DEFAULT_START_PAGE })
}
</script>

<style lang="scss">
.default-layout {
  height: 100vh;
  background-color: $colorBackground;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 'side header' 'side main' 'side footer';
}

.default-layout__top-bar {
  grid-area: header;
}

.default-layout__side-bar {
  grid-area: side;
  overflow: auto;
}

.default-layout__main {
  padding: 24px;
  overflow: auto;
  grid-area: main;
}

.default-layout__bottom-bar {
  grid-area: footer;
}
</style>
