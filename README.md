# Svelte Easyroute: SSR template

This is a project template for [Svelte Easyroute](https://github.com/lyohaplotinka/svelte-easyroute) with SSR.

*You need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies

```bash
cd svelte-easyroute-ssr-template
npm install
```

If you want to try SSR right now, execute `npm run build` first, and
then `npm run start:ssr`.

### package.json scripts
* `build` - build both server-side and client-side app
* `dev` - run client-side app in development mode (hot-reload, etc.)
* `start` - run "sirv" for build client-side app (without SSR)
* `start:ssr` - run Express.js server with SSR