import { createGlobalState } from '@vueuse/core'
import { ref, type Ref } from 'vue'

export const globalErrorStore = createGlobalState(() => {
  const show: Ref<boolean> = ref(false)

  const showError = () => {
    show.value = true
  }

  return { show, showError }
})
