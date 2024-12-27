## Live Demo

https://molist.netlify.app

## Unit Test Result

<img width="631" alt="image" src="https://github.com/user-attachments/assets/91b03d48-cb4e-420c-9ebd-f8d3f4886bd0" />


## E2E Test Result

<img width="1405" alt="image" src="https://github.com/user-attachments/assets/8d54666a-b9d9-41ba-b4dc-31a913a0e893" />


## TODO

- [ ] Collapse side bar. Click or hover on it will expand. Show only icons when collapsed
- [ ] Set timeout for API using Promise.race, e2e test
- [ ] Show retry button when error in Api, e2e test
- [ ] Allow navigate items of the list by using key up/down

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
