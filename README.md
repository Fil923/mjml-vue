> [!IMPORTANT]
> Experimental and under heavy development. APIs are subject to change.

# mjml-react &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Fil923/mjml-vue/blob/main/LICENSE.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Fil923/mjml-vue/pulls)

<img src="https://cdn.worldvectorlogo.com/logos/mjml-by-mailjet.svg" height="64"/> &middot; <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNjEuNzYgMjI2LjY5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMyAwIDAgLTEuMzMzMyAtNzYuMzExIDMxMy4zNCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OC4wNiAyMzUuMDEpIj48cGF0aCBkPSJtMCAwLTIyLjY2OS0zOS4yNjQtMjIuNjY5IDM5LjI2NGgtNzUuNDkxbDk4LjE2LTE3MC4wMiA5OC4xNiAxNzAuMDJ6IiBmaWxsPSIjNDFiODgzIi8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OC4wNiAyMzUuMDEpIj48cGF0aCBkPSJtMCAwLTIyLjY2OS0zOS4yNjQtMjIuNjY5IDM5LjI2NGgtMzYuMjI3bDU4Ljg5Ni0xMDIuMDEgNTguODk2IDEwMi4wMXoiIGZpbGw9IiMzNDQ5NWUiLz48L2c+PC9nPjwvc3ZnPgo=" alt="Vue logo" width="64px" height="64px"/>

There is an awesome library [mjml](https://mjml.io/) with github repo here [https://github.com/mjmlio/mjml](https://github.com/mjmlio/mjml).

`MJML` is a markup language created by [Mailjet](https://www.mailjet.com/).
So in order to create emails on the fly we created a library with `React` components.

This library is inspired by [mjml-react](https://github.com/Faire/mjml-react) by [Faire](https://github.com/Faire)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
