<script context="module">
	import { EasyrouteProvider, RouterOutlet, RouterLink } from 'svelte-easyroute'
	import registerRouterSSR from 'svelte-easyroute/ssr/registerRouterSSR'
	import router from "./router/router";

	registerRouterSSR(router)
</script>

<script>
	export let name;
</script>

<EasyrouteProvider {router}>
	<main>
		<h1>Hello {name}!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
		<p>This is demo project for Svelte Easyroute SSR. See the source code of this page :)</p>
		<RouterLink to="/">Page one</RouterLink>
		<RouterLink to="/page-two">Page two</RouterLink>
		<RouterOutlet />
	</main>
</EasyrouteProvider>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
