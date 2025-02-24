# Vue3 composition API + Vuetify + TypeScript

## Live Demo

https://molist.netlify.app

## Unit Test Result

<img width="631" alt="image" src="https://github.com/user-attachments/assets/91b03d48-cb4e-420c-9ebd-f8d3f4886bd0" />

## E2E Test Result

<img width="1408" alt="image" src="https://github.com/user-attachments/assets/b62b718f-8641-4003-bbcd-2c9be2ee6dd5" />

## FEATURES

- Debounce search using `vueUse`
- Navigation using Vue Router
- Responsive layout, support double tab to save an item -> good UX for mobile users
- Fetch data from API by chunks and show pagination
- Cache api data in local & session storage

## TODO

- [ ] Collapse side bar. Click or hover on it will expand. Show only icons when collapsed
- [x] Set timeout for API using ~~Promise.race~~ axios timeout, e2e test
- [x] Show retry button when error in Api, e2e test
- [ ] Allow navigate items of the list by using key up/down
- [ ] Open IDMb link when clicking on the item e.g. https://www.imdb.com/title/tt0454353/

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
