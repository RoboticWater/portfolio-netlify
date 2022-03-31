<script context="module">
	import { MY_TWITTER, MY_YOUTUBE, REPO_URL } from '$lib/siteConfig';
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url }) {
		return {
			props: {
				url
			}
		};
	}
</script>

<script>
	import '../tailwind.css';
	export let url;
	import { highlight } from '../components/hoverHighlight';

	let y, innerHeight;

	import { spring } from 'svelte/motion';

	let pos = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.35
		}
	);

	function mouseMove(event) {
		pos.set({ x: event.clientX, y: event.clientY });
	}

	$: hideExtra = url.pathname !== '/' || y > innerHeight * 0.4;
</script>

<svelte:window on:mousemove={mouseMove} bind:scrollY={y} bind:innerHeight />

<header class="fixed left-4 right-4 top-4 flex justify-between text-zinc-800 z-50">
	<div class="text-xl p-4">
		<a href="/" class="text-zinc-800 hideable" class:hide={hideExtra}>John Britti</a>
	</div>
	<div class="flex items-center gap-4 bg-white p-4 rounded-md">
		<a
			href="/"
			class="text-zinc-800"
			on:mouseenter={() => highlight.set(true)}
			on:click={() => highlight.set(false)}
			on:mouseleave={() => highlight.set(false)}>Home</a
		>
		<a
			href="/work"
			class="text-zinc-800"
			on:mouseenter={() => highlight.set(true)}
			on:click={() => highlight.set(false)}
			on:mouseleave={() => highlight.set(false)}>Work</a
		>
		<!-- <a
			href="#Skills"
			class="text-zinc-800"
			on:mouseenter={() => highlight.set(true)}
			on:mouseleave={() => highlight.set(false)}>Skills</a
		> -->
		<a
			href="/Britti-Resume-2022.pdf"
			target="_blank"
			class="text-zinc-800"
			on:mouseenter={() => highlight.set(true)}
			on:click={() => highlight.set(false)}
			on:mouseleave={() => highlight.set(false)}>Resume</a
		>
	</div>
</header>

<div
	class="hover-highlight"
	style={`transform: translate(${$pos.x}px, ${$pos.y}px)`}
	class:active={$highlight}
/>

<main class="flex flex-col justify-center text-zinc-800 dark:bg-gray-900">
	<slot />
</main>

<footer class="fixed left-8 right-8 bottom-8 flex justify-between pointer-events-none">
	<div class="hideable text-xl" class:hide={hideExtra}>Portfolio 2020</div>
	<div class="flex gap-1.5 items-end">
		<div class="bg-red-500 w-2.5 h-2.5" />
		<div class="bg-amber-200 w-2.5 h-2.5" />
		<div class="bg-blue-500 w-2.5 h-2.5" />
		<div class="bg-pink-100 w-2.5 h-2.5" />
		<div class="bg-emerald-400 w-2.5 h-2.5" />
		<div class="bg-black w-2.5 h-2.5" />
	</div>
</footer>

<style>
	:root {
		--highlight-radius: 60px;
	}
	.hover-highlight {
		mix-blend-mode: exclusion;
		width: 0;
		height: 0;
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		border-radius: 100%;
		z-index: 100;
		transition: top 0.4s cubic-bezier(0.34, 0.51, 0.09, 0.95),
			left 0.4s cubic-bezier(0.34, 0.51, 0.09, 0.95),
			height 0.4s cubic-bezier(0.34, 0.51, 0.09, 0.95),
			width 0.4s cubic-bezier(0.34, 0.51, 0.09, 0.95);
		pointer-events: none;
	}
	.hover-highlight.active {
		width: var(--highlight-radius);
		height: var(--highlight-radius);
		top: calc(var(--highlight-radius) * -0.5);
		left: calc(var(--highlight-radius) * -0.5);
	}
	.hideable {
		transition: opacity 0.5s ease;
	}
	.hideable.hide {
		opacity: 0;
	}
</style>
