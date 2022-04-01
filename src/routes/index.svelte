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
	import { format, parse } from 'date-fns';
	import MainGraphic from '../components/MainGraphic.svelte';

	export let items = { list: [] };
	console.log(items);
	$: list = [...items.list, ...items.list, ...items.list];

	let y;
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
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

<section class="pb-48">
	<div
		class="graphic__container pointer-events-none w-full overflow-hidden fixed -z-10 top-0 left-0 right-0 bottom-0"
	>
		<div class="graphic__align relative left-1/2 text-center"><MainGraphic /></div>
	</div>
	<div id="about" class="flex justify-center">
		<div class="p-4 flex flex-wrap justify-center gap-8 max-w-5xl">
			<div class="about-content flex-1">
				<p class="mt-8 text-6xl font-bold">Hi, I'm John</p>
			</div>
			<div class="about-content text-xl flex-1">
				<p class="my-4">
					I'm a designer, user researcher, and web developer located in Atlanta, GA.
				</p>
				<p class="my-4">
					Good design requires creative ambition and the technical competence to execute on vision,
					it calls for professionalism in application of ethics and discussion, and above all it
					demands compassion and rigor in the understanding of our fellow man.
				</p>
				<p class="my-4">
					These are the qualities that I believe I can bring to you venture, whatever it may be.
				</p>
			</div>
		</div>
	</div>
	<div id="work" class="flex justify-center">
		<div class="grid p-4 gap-4 max-w-5xl w-full">
			{#each list as item}
				<a sveltekit:prefetch class="work-item flex flex-col cursor-pointer" href={item.slug}>
					<div class="grid overflow-hidden h-96 rounded-md mb-2">
						<div
							class="image bg-cover bg-center"
							style={`background-image: url(${item.data.img})`}
						/>
					</div>
					<h2 class="text-4xl italic font-serif font-black text-zinc-800 mb-1">{item.title}</h2>
					<div class="flex items-center gap-2 text-zinc-800 text-mono">
						<div>
							{format(parse(item.data.date, 'yyyy-MM-dd', new Date()), 'yyyy')}
						</div>
						<div class="w-1 h-1 rounded bg-zinc-800" />
						<div>{item.data.type}</div>
						<div class="w-1 h-1 rounded bg-zinc-800" />
						<div>{item.data.result}</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		animation: fade-section 800ms cubic-bezier(0.33, 0.43, 0.04, 0.97);
		scroll-behavior: smooth;
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
	#work > div {
		grid-template-columns: repeat(auto-fit, minmax(324px, 1fr));
	}
	.description {
		height: 440px;
		top: 30vh;
	}
	.about-content {
		min-width: 324px;
	}
	.work-items {
		/* display: flex;
		flex-direction: column;
		justify-self: center;
		gap: 24px;
		margin-left: auto; */
		/* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
	}
	.work-items > div {
		display: inline;
	}
	.image {
		transition: transform 0.5s cubic-bezier(0.26, 0.47, 0.04, 0.96);
	}
	a:hover .image {
		transform: scale(1.08);
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
