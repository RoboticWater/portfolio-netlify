<script context="module">
	import {
		SITE_URL,
		REPO_URL,
		SITE_TITLE,
		SITE_DESCRIPTION,
		DEFAULT_OG_IMAGE,
		MY_TWITTER
	} from '$lib/siteConfig';
	export const prerender = true; // index page is most visited, lets prerender

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
	import { fly } from 'svelte/transition';
	import { sineInOut, quadInOut } from 'svelte/easing';

	import MainGraphic from '../components/MainGraphic.svelte';
	import WorkItem from '../components/WorkItem.svelte';

	export let items = { list: [] };

	let currentDescription = ['', '', ''];

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

	let y;
</script>

<svelte:head>
	<!-- <title>{SITE_TITLE}</title> -->
	<title>John Britti — Portfolio</title>
	<link rel="canonical" href={SITE_URL} />
	<link rel="alternate" type="application/rss+xml" href={SITE_URL + '/api/rss.xml'} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta name="Description" content={SITE_DESCRIPTION} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content={MY_TWITTER} />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
</svelte:head>

<svelte:window bind:scrollY={y} />

<section>
	<div
		class="graphic__container pointer-events-none w-full overflow-hidden fixed -z-10 top-0 left-0 right-0 bottom-0"
	>
		<div class="graphic__align relative left-1/2 text-center"><MainGraphic /></div>
	</div>
	<div id="about" class="flex flex-wrap justify-center p-16 gap-8">
		<div>
			<p class="mt-8 text-6xl font-bold">Hi, I'm John</p>
		</div>
		<div class="text-xl">
			<p class="my-4">I'm a designer, user researcher, and web developer located in Atlanta, GA.</p>
			<p class="my-4">
				Good design requires creative ambition and the technical competence to execute on vision, it
				calls for professionalism in application of ethics and discussion, and above all it demands
				compassion and rigor in the understanding of our fellow man.
			</p>
			<p class="my-4">
				These are the qualities that I believe I can bring to you venture, whatever it may be.
			</p>
		</div>
	</div>
	<div id="work" class="gap-8">
		<div class="work-items flex-1 justify-self-end">
			{#each list as item}
				<div
					on:mouseenter={() => {
						currentDescription = splitDescription(item.subtitle);
					}}
					on:mouseleave={() => {
						currentDescription = ['', '', ''];
					}}
				>
					<WorkItem href={item.slug} title={item.title} img={item.data.img} />
				</div>
			{/each}
			{#each list as item}
				<div
					on:mouseenter={() => {
						currentDescription = splitDescription(item.subtitle);
					}}
					on:mouseleave={() => {
						currentDescription = ['', '', ''];
					}}
				>
					<WorkItem href={item.slug} title={item.title} img={item.data.img} />
				</div>
			{/each}

			{#each list as item}
				<div
					on:mouseenter={() => {
						currentDescription = splitDescription(item.subtitle);
					}}
					on:mouseleave={() => {
						currentDescription = ['', '', ''];
					}}
				>
					<WorkItem href={item.slug} title={item.title} img={item.data.img} />
				</div>
			{/each}

			{#each list as item}
				<div
					on:mouseenter={() => {
						currentDescription = splitDescription(item.subtitle);
					}}
					on:mouseleave={() => {
						currentDescription = ['', '', ''];
					}}
				>
					<WorkItem href={item.slug} title={item.title} img={item.data.img} />
				</div>
			{/each}

			{#each list as item}
				<div
					on:mouseenter={() => {
						currentDescription = splitDescription(item.subtitle);
					}}
					on:mouseleave={() => {
						currentDescription = ['', '', ''];
					}}
				>
					<WorkItem href={item.slug} title={item.title} img={item.data.img} />
				</div>
			{/each}
		</div>
		<div class="description sticky flex-1 font-semibold flex flex-col justify-center">
			{#each currentDescription as line, i}
				<div class="line relative overflow-hidden h-12">
					{#key currentDescription[i]}
						<div
							class="absolute left-0 bg-white text-5xl"
							out:fly|local={{ y: 54, delay: i * 100, duration: 400, easing: sineInOut }}
							in:fly={{ y: -54, delay: i * 100, duration: 400, easing: quadInOut }}
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
		animation: fade-section 800ms cubic-bezier(0.33, 0.43, 0.04, 0.97);
	}
	.graphic__container {
		height: 100vh;
		/* pointer-events: none; */
	}
	.graphic__align {
		width: 10000px;
		margin: 0 0 0 -5000px;
	}
	.graphic__align > :global(.main-graphic) {
		height: 100vh;
	}
	#about {
		margin-top: 110vh;
		margin-bottom: 200px;
	}
	#about > div {
		max-width: 500px;
		min-width: 250px;
		flex: 1;
	}
	#work {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding-bottom: 2000px;
	}
	.description {
		height: 440px;
		top: 30vh;
	}
	.work-items {
		display: flex;
		flex-direction: column;
		justify-self: center;
		gap: 24px;
		margin-left: auto;
		/* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
	}
	/* .work-items > div:nth-child(odd) {
		position: relative;
		top: 200px;
	} */
	@keyframes fade-section {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
