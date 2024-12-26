import { describe, it, expect, vi, afterEach } from 'vitest'
import { createVuetify } from 'vuetify'
import { mount, VueWrapper } from '@vue/test-utils'
import MovieItem from '@/components/MovieItem.vue'
import { beforeEach } from 'vitest'
import type { Movie } from '@/models/Movie'
import * as favoriteStore from '@/stores/favorite'

const useFavoritesMock = vi.hoisted(() => ({
  like: vi.fn(),
  unlike: vi.fn(),
  isLiked: vi.fn(),
}))

const vuetify = createVuetify()

let wrapper: VueWrapper

const movie: Movie = {
  title: 'One Piece',
  year: 1999,
  imdbId: 'tt0388629',
}

function mountComponent() {
  wrapper = mount(MovieItem, {
    props: { movie },
    global: {
      plugins: [vuetify],
    },
  })
}

beforeEach(() => {
  mountComponent()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('MovieItem', () => {
  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should render title', () => {
    const title = wrapper.find('.movie-item__title')
    expect(title.text()).toBe(movie.title)
  })
  it('should render year', () => {
    const year = wrapper.find('[test-id="movie-item-year"]')
    expect(year.text()).toBe(`Year: ${movie.year}`)
  })
  it('should render Imdb ID', () => {
    const imdbId = wrapper.find('[test-id="movie-item-imdbid"]')
    expect(imdbId.text()).toBe(`IMDb ID: ${movie.imdbId}`)
  })
  it('should change stared ref if clicked star icon', async () => {
    const icon = wrapper.find('.movie-item__icon')
    // @ts-expect-error to access stared ref
    expect(wrapper.vm.isStarred).toBe(false)
    await icon.trigger('click')
    // @ts-expect-error to access stared ref
    expect(wrapper.vm.isStarred).toBe(true)

    await icon.trigger('click')
    // @ts-expect-error to access stared ref
    expect(wrapper.vm.isStarred).toBe(false)
  })
  it('should call "star" with correct movie', async () => {
    // @ts-expect-error to test
    vi.spyOn(favoriteStore, 'favoriteStore').mockReturnValue(useFavoritesMock)
    mountComponent()

    const icon = wrapper.find('.movie-item__icon')
    await icon.trigger('click')
    expect(useFavoritesMock.like).toHaveBeenCalledTimes(1)
    expect(useFavoritesMock.like).toHaveBeenCalledWith(movie)
  })

  it('should call "unStar" with correct movie', async () => {
    // @ts-expect-error to test
    vi.spyOn(favoriteStore, 'favoriteStore').mockReturnValue(useFavoritesMock)
    mountComponent()

    const icon = wrapper.find('.movie-item__icon')
    await icon.trigger('click')
    await icon.trigger('click')
    expect(useFavoritesMock.unlike).toHaveBeenCalledTimes(1)
    expect(useFavoritesMock.unlike).toHaveBeenCalledWith(movie.imdbId)
  })
})
