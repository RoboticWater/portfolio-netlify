<script context="module">
	// export const prerender = true; // you can uncomment to prerender as an optimization
	import * as cheerio from 'cheerio';
	export const hydrate = true;
	import { REPO_URL, SITE_URL } from '$lib/siteConfig';
	import Comments from '../components/Comments.svelte';
	export async function load({ url, params, fetch }) {
		const slug = params.slug;
		try {
			const res = await fetch(`/api/blog/${slug}.json`);
			if (res.status > 400) {
				return {
					status: res.status,
					error: await res.text()
				};
			}
			const x = (await res.json()).data;
			const json = JSON.parse(x);
			const sections = [{ hash: '#description', title: 'Description' }];
			const $ = cheerio.load(json.content);
			$('h2').each((i, e) => {
				sections.push({
					title: $(e).text(),
					hash: '#' + $(e).attr('id')
				});
			});
			return {
				props: {
					json,
					slug,
					REPO_URL,
					sections
				},
				maxage: 60 // 1 minute
			};
		} catch (err) {
			console.error('error fetching blog post at [slug].svelte: ' + slug, err);
			return {
				status: 500,
				error: new Error('error fetching blog post at [slug].svelte: ' + slug)
			};
		}
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { parseISO, format } from 'date-fns';

	import 'prism-themes/themes/prism-shades-of-purple.min.css';
	import MetaList from '../components/MetaList.svelte';
	import Reactions from '../components/Reactions.svelte';

	export let json = {};
	let title = json.title;
	let subtitle = json.subtitle;
	let date = json.date;
	let content = json.content;
	let ghMetadata = json.ghMetadata;
	let img = json.data.img;
	let imgAttributionLink = json.data.imgAttributionLink;
	let imgAttributionAuthor = json.data.imgAttributionAuthor;
	let team = json.data.team;
	let tools = json.data.tools;
	//TODO: figure out why this is formatted this way w/ data
	let tags = json.data.tags;
	console.log(json);
	export let sections = [];

	let y;
	let sectionRefs;
	let currentEntry;
	let hamburgerToggle = false;
	onMount(() => {
		currentEntry = location.hash || '#description';
		sectionRefs = [document.querySelector('h1 a'), ...document.querySelectorAll('h2 a')];
		let options = {
			rootMargin: '0% 0% -85%',
			threshold: 1.0
		};

		let observer = new IntersectionObserver((entries) => {
			for (const elem of sectionRefs) {
				const rect = elem.getBoundingClientRect();
				// console.log(elem, rect.bottom);
				if (rect.bottom <= window.innerHeight * 0.15) {
					currentEntry = elem.getAttribute('href');
				} else {
					return;
				}
			}
		}, options);
		sectionRefs.forEach((e) => observer.observe(e));
	});

	// export let slug;
	// export let REPO_URL
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="swyxkit blog" />

	<link rel="canonical" href={SITE_URL} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="Description" content={json.description} />
	<meta property="og:description" content={json.description} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="https://twitter.com/swyx/" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={json.description} />
	{#if json.image}
		<meta property="og:image" content={json.image} />
		<meta name="twitter:image" content={json.image} />
	{/if}
</svelte:head>

<svelte:window bind:scrollY={y} on:hashchange={() => (currentEntry = location.hash)} />

<article class="grid">
	<div class="title grid items-center">
		<div class="title__content">
			<h1 class="italic font-serif font-black text-zinc-800 text-7xl mb-8">
				<a href="#description" class="py-2 pr-5 bg-white relative">
					{title}
					<span class="absolute -right-4 -bottom-4 top-4 left-0 bg-emerald-400" />
				</a>
			</h1>
			<div class="max-w-lg">
				<span class="subtitle font-mono text-xl bg-white p-2 leading-relaxed">{subtitle}</span>
			</div>
		</div>
	</div>
	<div class="navigation pt-8">
		<nav class="sticky top-7">
			<h2 class="font-mono font-medium uppercase text-sm mb-2 tracking-wider">Sections</h2>
			<ul>
				{#each sections as section}
					<li class="font-mono text-zinc-600 text-xs mb-1">
						<a class="flex" href={section.hash}>
							<div class="arrow" class:active={section.hash === currentEntry}>→</div>
							{section.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<div
		class="main-img bg-center rounded-bl-lg relative"
		style={`background-image: url(${img}); top: ${y * 0.3}px`}
	>
		<div class="img-attribution text-right font-mono text-xs absolute -bottom-5 right-2">
			{#if imgAttributionAuthor}<a class="text-zinc-800" href={imgAttributionLink}>Image</a> by {imgAttributionAuthor}{/if}
		</div>
	</div>
	<div class="content bg-white pt-8 rounded-tr-lg pr-8">
		<div class="meta columns-3 mb-8">
			<div class="break-inside-avoid mb-6">
				<MetaList name="Date" list={[format(parseISO(date), 'MMMM yyyy')]} />
			</div>
			<div class="break-inside-avoid mb-6">
				<MetaList name="Team" list={team} />
			</div>
			<div class="break-inside-avoid mb-6">
				<MetaList name="Tools" list={tools} />
			</div>
			<div class="break-inside-avoid mb-6">
				<MetaList name="Tags" list={tags} />
			</div>
		</div>
		<div class="post">
			<div class="w-full mb-32 prose leading-relaxed dark:prose-invert max-w-none">
				{@html content}
			</div>
		</div>
	</div>
</article>

<style>
	article {
		grid-template-areas:
			'. title main-img main-img main-img'
			'. navigation content . .';
		grid-template-columns: 1fr 200px 720px 200px 1fr;
		grid-template-rows: 540px auto;
		padding-bottom: 1000px;
		/* animation: article-intro 0.5s cubic-bezier(0.17, 0.45, 0.11, 0.9); */
	}
	.title {
		grid-area: title;
	}
	.title a {
		/* white-space: pre-wrap; */
	}
	.title a span {
		z-index: -1;
	}
	.title__content {
		width: 920px;
		/* margin-left: 0; */
	}
	.subtitle {
		white-space: pre-wrap;
		padding-left: 0px;
		/* box-shadow: -16px 0 0 #fff; */
		max-width: 600px;
		top: 2px;
		position: relative;
	}
	.navigation {
		grid-area: navigation;
		/* animation: content-intro 0.3s cubic-bezier(0.17, 0.45, 0.11, 0.9); */
	}
	.main-img {
		grid-area: main-img;
		z-index: -10;
	}
	.content {
		grid-area: content;
		position: relative;
		/* animation: content-intro 0.3s cubic-bezier(0.17, 0.45, 0.11, 0.9); */
	}
	.content:after {
		content: '';
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		left: 0;
		top: -0.5rem;
		background: radial-gradient(circle at 100% 0, #fff0 0.5rem, #fff 9px);
		z-index: 10;
	}
	.img-attribution {
	}

	.arrow {
		width: 0px;
		overflow: hidden;
		transition: width 0.15s ease;
	}
	.arrow.active {
		width: 10px;
	}
	@keyframes article-intro {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes content-intro {
		0% {
			margin-top: 100px;
		}
		100% {
			margin-top: 0;
		}
	}
</style>
