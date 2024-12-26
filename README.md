## Demo

https://drive.google.com/file/d/1snCBrp7o23yMgTixvFX-lYZvak1rOQeF

## Unit Test Result

<img width="521" alt="image" src="https://github.com/user-attachments/assets/bdedb17c-1c21-48a1-9381-9b6676fae4b4" />

## E2E Test Result

<img width="1387" alt="image" src="https://github.com/user-attachments/assets/c61ac37a-a7e4-4208-8f82-5028739bde50" />

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
