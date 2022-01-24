<script context="module">
	import { MY_TWITTER, MY_YOUTUBE, REPO_URL } from '$lib/siteConfig';
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url }) {
		return {
			props: {
				origin: url.origin
			}
		};
	}
</script>

<script>
	import '../tailwind.css';
	import Nav from '../components/Nav.svelte';
	export let origin = '';
</script>

<header class="fixed left-8 right-8 top-8 flex justify-between">
	<div class="text-xl">John Britti</div>
	<div class="flex gap-4">
		<a href="#Home" class="text-zinc-800">Home</a>
		<a href="#Work" class="text-zinc-800">Work</a>
		<a href="#Skills" class="text-zinc-800">Skills</a>
		<a href="#Resume" class="text-zinc-800">Resume</a>
	</div>
</header>

<main class="flex flex-col justify-center px-4 sm:px-8 text-zinc-800 dark:bg-gray-900">
	<slot />
</main>

<footer class="fixed left-8 right-8 bottom-8 flex justify-between">
	<div class="text-xl">Portfolio 2020</div>
	<div class="flex gap-2 items-end">
		<div class="bg-red-500 w-3 h-3" />
		<div class="bg-amber-300 w-3 h-3" />
		<div class="bg-blue-500 w-3 h-3" />
		<div class="bg-pink-100 w-3 h-3" />
		<div class="bg-emerald-400 w-3 h-3" />
		<div class="bg-black w-3 h-3" />
	</div>
</footer>
