import { describe, it, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import { mount, VueWrapper } from '@vue/test-utils'
import SearchInput from '@/components/SearchInput.vue'
import { beforeEach } from 'vitest'

const vuetify = createVuetify()

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = mount(SearchInput, {
    props: { modelValue: 'first value' },
    global: {
      plugins: [vuetify],
    },
  })
})

describe('SearchInput', () => {
  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should change value of input if model value is changed', async () => {
    const expected = 'new value'
    const input = wrapper.find('[test-id="search-input"]')
    await input.setValue(expected)
    expect(input.attributes('value')).toBe(expected)
  })
  it('should emit "input" when changed value', () => {
    const input = wrapper.find('[test-id="search-input"]')
    input.setValue('New Test Value')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(1)
    expect(wrapper.emitted().input[1]).toEqual(undefined)
  })
  it('should emit "clear" when clicked clear icon', async () => {
    const clearIcon = wrapper.find('.v-field__clearable i')
    await clearIcon.trigger('click')

    expect(wrapper.emitted().clear).toBeTruthy()
    expect(wrapper.emitted().clear.length).toBe(1)
    expect(wrapper.emitted().clear[1]).toEqual(undefined)
  })
})
