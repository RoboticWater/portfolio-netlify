<script context="module">
	// export const prerender = true; // turned off so it refreshes quickly
	export async function load({ params, fetch }) {
		const res = await fetch(`/api/listBlogposts.json`);
		// alternate strategy https://www.davidwparker.com/posts/how-to-make-an-rss-feed-in-sveltekit
		// Object.entries(import.meta.glob('./*.md')).map(async ([path, page]) => {
		if (res.status > 400) {
			return {
				status: res.status,
				error: await res.text()
			};
		}
		const items = await res.json();
		return {
			props: { items },
			maxage: 60 // 1 minute
		};
	}
</script>

<script>
	import IndexCard from '../components/IndexCard.svelte';
	import WorkItem from '../components/WorkItem.svelte';
	import { fade, fly, crossfade, slide } from 'svelte/transition';
	import { sineInOut, quadInOut } from 'svelte/easing';

	export let page;
	export let list;
	export let items = { list: [] };

	const [send, receive] = crossfade({
		duration: 200,
		fallback: fly
	});

	let currentDescription = ['', '', ''];

	const PAGE_SIZE = 30;
	$: start = 1 + (page - 1) * PAGE_SIZE;
	$: next = `/${list}/${+page + 1}`;

	let isTruncated = items.list.length > 20;
	let search;
	let charSplit = 20;
	$: list = items.list
		.filter((item) => {
			if (search) {
				return item.title.toLowerCase().includes(search.toLowerCase());
			}
			return true;
		})
		.slice(0, isTruncated ? 2 : items.list.length);

	function setDescription(description) {
		currentDescription = description;
	}
	function splitDescription(description) {
		return description.split(' ').reduce((acc, cur, i) => {
			if (i === 0) return [cur];
			if (acc[acc.length - 1].length > charSplit) {
				return [...acc, cur];
			} else {
				acc[acc.length - 1] += ' ' + cur;
				return acc;
			}
		}, []);
	}
</script>

<svelte:head>
	<title>Works | John Britti</title>
	<meta name="description" content="Latest Hacker News stories in the {list} category" />
</svelte:head>

<section class="grid grid-cols-3 gap-8">
	<div class="work-col flex flex-col gap-8 work-col-1 my-4">
		<div
			on:mouseenter={() => setDescription(splitDescription(list[0].subtitle))}
			on:mouseleave={() => {
				currentDescription = ['', '', ''];
			}}
		>
			<WorkItem href={list[0].slug} title={list[0].title} img={list[0].data.img} />
		</div>
		<div class="image-container grid overflow-hidden rounded-xl border-zinc-800 border" />
	</div>
	<div class="work-col flex flex-col work-col-2 gap-8">
		<div class="image-container grid overflow-hidden rounded-xl border-zinc-800 border" />
		<div
			on:mouseenter={() => {
				currentDescription = ['This is a test', 'of the description', 'animation'];
			}}
			on:mouseleave={() => {
				currentDescription = ['', '', ''];
			}}
		>
			<WorkItem href={list[0].slug} title={list[0].title} img={list[0].data.img} />
		</div>
	</div>
	<div class="description grid font-semibold">
		<div class="self-center">
			{#each currentDescription as line, i}
				<div class="line relative overflow-hidden">
					{#key currentDescription[i]}
						<div
							class="absolute left-0 bg-white text-5xl"
							out:fly|local={{ y: 54, delay: i * 100, duration: 350, easing: sineInOut }}
							in:fly={{ y: -54, delay: i * 100, duration: 350, easing: quadInOut }}
						>
							{line}
						</div>
					{/key}&#160;
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		padding-left: 100px;
		grid-template-columns: 360px 360px 1fr;
	}
	.image-container {
		height: 440px;
	}
	.work-col {
		/* gap: 20px; */
		position: relative;
	}
	.work-col-1 {
		/* animation: column0-intro 0.5s cubic-bezier(0.28, 0.4, 0.12, 0.96); */
	}
	.work-col-2 {
		margin-top: -220px;
	}
	.description {
		height: 100vh;
		padding-left: 40px;
	}
	.line {
		line-height: 54px;
	}
	/* @keyframes column0-intro {
		0% {
			margin-top: 300px;
		}
		100% {
			margin-top: 16px;
		}
	} */
</style>
