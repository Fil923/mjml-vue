> [!IMPORTANT]
> Experimental and under heavy development. APIs are subject to change.

# mjml-vue &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Fil923/mjml-vue/blob/main/LICENSE.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Fil923/mjml-vue/pulls)

<img src="https://cdn.worldvectorlogo.com/logos/mjml-by-mailjet.svg" height="64"/> &middot; <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNjEuNzYgMjI2LjY5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMyAwIDAgLTEuMzMzMyAtNzYuMzExIDMxMy4zNCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OC4wNiAyMzUuMDEpIj48cGF0aCBkPSJtMCAwLTIyLjY2OS0zOS4yNjQtMjIuNjY5IDM5LjI2NGgtNzUuNDkxbDk4LjE2LTE3MC4wMiA5OC4xNiAxNzAuMDJ6IiBmaWxsPSIjNDFiODgzIi8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OC4wNiAyMzUuMDEpIj48cGF0aCBkPSJtMCAwLTIyLjY2OS0zOS4yNjQtMjIuNjY5IDM5LjI2NGgtMzYuMjI3bDU4Ljg5Ni0xMDIuMDEgNTguODk2IDEwMi4wMXoiIGZpbGw9IiMzNDQ5NWUiLz48L2c+PC9nPjwvc3ZnPgo=" alt="Vue logo" width="64px" height="64px"/>

Write responsive email templates using [Vue](https://vuejs.org/) components and [MJML](https://mjml.io/) markup, then compile them to static HTML files ready for server-side delivery with [Handlebars](https://handlebarsjs.com/) (or any templating engine).

Inspired by [mjml-react](https://github.com/Faire/mjml-react) by [Faire](https://github.com/Faire).

## How it works

1. You author email templates as Vue Single-File Components (`.vue`) using native MJML tags (`<mj-section>`, `<mj-column>`, `<mj-text>`, `<mj-button>`, etc.)
2. Vue's SSR (`renderToString`) serializes the component tree into an MJML markup string
3. `mjml2html()` compiles the MJML string into responsive, email-safe HTML
4. The output is written to `dist/emails/` as static `.html` files

Handlebars tokens like `{{ userName }}` or `{{activationUrl}}` are preserved through the entire pipeline and can be processed by your server at send time.

## Quick start

### Prerequisites

- [Bun](https://bun.sh/) (package manager and runtime)
- Node.js `^22.12.0` or `>=24.11.1`

### Install

```sh
bun install
```

### Build email templates

```sh
bun run build:emails
```

This outputs static HTML files to `dist/emails/`. For example, the included `welcome` template produces `dist/emails/welcome.html`.

## Writing email templates

### Using native MJML tags

All `mj-*` tags are treated as native custom elements (via the `isCustomElement` Vite config). You write standard MJML markup directly in your Vue templates — no wrapper components needed:

```vue
<template>
  <Skeleton title="Welcome" preview="Welcome to our platform!">
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column>
        <mj-text font-size="24px" color="#333333" align="center"> Hello! </mj-text>
        <mj-button href="https://example.com" background-color="#346DB7" color="white">
          Get Started
        </mj-button>
      </mj-column>
    </mj-section>
  </Skeleton>
</template>

<script setup lang="ts">
import { Skeleton } from "@/components/mjml";
</script>
```

### Skeleton layout component

The `Skeleton` component provides a shared email layout with `<mjml>`, `<mj-head>`, and `<mj-body>` wrapping, plus a configurable footer:

| Prop      | Type     | Required | Default      | Description                                |
| --------- | -------- | -------- | ------------ | ------------------------------------------ |
| `title`   | `string` | Yes      | —            | Email title (rendered in `<mj-title>`)     |
| `preview` | `string` | No       | —            | Preview text (rendered in `<mj-preview>`)  |
| `year`    | `number` | No       | Current year | Year shown in the default copyright footer |

**Slots:**

| Slot      | Description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| `default` | Main email body content                                                               |
| `head`    | Extra content injected into `<mj-head>` (e.g. custom `<mj-attributes>`, `<mj-style>`) |
| `footer`  | Overrides the default copyright footer text                                           |

### Handlebars tokens

To pass Handlebars syntax (`{{ }}`) through the Vue template compiler without interpolation, use the `v-pre` directive on the element:

```vue
<mj-text v-pre font-size="24px">
  Welcome, {{ userName }}!
</mj-text>

<mj-button v-pre href="{{activationUrl}}">
  Activate
</mj-button>
```

## Rendering API

### `renderToMjml(component, props?)`

Renders a Vue component tree to an MJML markup string using Vue SSR.

```ts
import { renderToMjml } from "@/lib/renderToMjml";
import WelcomeEmail from "./emails/welcome.vue";

const mjml = await renderToMjml(WelcomeEmail);
// => '<mjml lang="en"><mj-head>...</mj-head><mj-body>...</mj-body></mjml>'
```

### `renderToHtml(component, props?, mjmlOptions?)`

Renders a Vue component tree to final email-safe HTML (calls `renderToMjml` then `mjml2html`).

```ts
import { renderToHtml } from "@/lib/renderToMjml";
import WelcomeEmail from "./emails/welcome.vue";

const { html, errors } = await renderToHtml(WelcomeEmail);
// html => '<!doctype html><html>...</html>'
// errors => [] (MJML validation errors, if any)
```

## Build script

The build script at `src/build-emails.ts` registers all email templates and outputs them to `dist/emails/`:

```ts
const templates: EmailTemplate[] = [
  { name: "welcome", component: WelcomeEmail },
  // Add more templates here
];
```

Run with:

```sh
bun run build:emails
```

The script uses [`vite-node`](https://github.com/vitest-dev/vitest/tree/main/packages/vite-node) to handle `.vue` SFC compilation at build time, with `--mode email` to disable devtools and prevent attribute pollution in the output.

## Adding a new email template

1. Create a new `.vue` file in `src/emails/`:

   ```vue
   <!-- src/emails/reset-password.vue -->
   <template>
     <Skeleton title="Reset Password" preview="Reset your password">
       <mj-section background-color="#ffffff" padding="20px">
         <mj-column>
           <mj-text v-pre>Hi {{ userName }}, reset your password below.</mj-text>
           <mj-button v-pre href="{{resetUrl}}">Reset Password</mj-button>
         </mj-column>
       </mj-section>
     </Skeleton>
   </template>

   <script setup lang="ts">
   import { Skeleton } from "@/components/mjml";
   </script>
   ```

2. Register it in `src/build-emails.ts`:

   ```ts
   import ResetPasswordEmail from "./emails/reset-password.vue";

   const templates: EmailTemplate[] = [
     { name: "welcome", component: WelcomeEmail },
     { name: "reset-password", component: ResetPasswordEmail },
   ];
   ```

3. Build:

   ```sh
   bun run build:emails
   ```

## Project setup

### Development

```sh
bun run dev
```

### Type-check

```sh
bun run tsc
```

### Run tests

```sh
bun run test:unit
```

### Lint

```sh
bun run lint
```

### Build for production

```sh
bun run build
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## License

[MIT](LICENSE.md)
