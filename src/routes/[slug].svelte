<script context="module">
	// export const prerender = true; // you can uncomment to prerender as an optimization
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

			return {
				props: {
					json,
					slug,
					REPO_URL
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
	import { parseISO, format } from 'date-fns';

	import 'prism-themes/themes/prism-shades-of-purple.min.css';
	import Newsletter from '../components/Newsletter.svelte';
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
	console.log(json);
	let sections = [
		{
			title: 'test',
			hash: '#test'
		}
	];
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

<article class="grid">
	<div class="title">
		<h1 class="uppercase italic font-serif font-black text-zinc-800 text-7xl">{title}</h1>
		<div class="subtitle font-mono text-xl">{subtitle}</div>
	</div>
	<div class="navigation">
		<nav class="sticky">
			<ul>
				{#each sections as section}
					<li><a href={section.hash}>{section.title}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
	<div class="main-img bg-center" style={`background-image: url(${img})`} />
	<div class="content">
		<div class="meta grid-cols-3 grid">
			<div class="meta-item">
				<h2 class="font-mono">Date</h2>
				<div class="meta-item__content">{format(parseISO(date), 'MMMM yyyy')}</div>
			</div>
		</div>
		<div class="post">
			<div class="w-full mb-32 prose dark:prose-invert max-w-none">
				{@html content}
			</div>
		</div>
	</div>
	<div class="img-attribution text-right">
		{#if imgAttributionAuthor}<a href={imgAttributionLink}>Image</a> by {imgAttributionAuthor}{/if}
	</div>
</article>

<style>
	article {
		grid-template-areas:
			'. title main-img main-img main-img'
			'. navigation content . img-attribution';
		grid-template-columns: 1fr 200px 720px 200px 1fr;
		grid-template-rows: 540px auto;
	}
	.title {
		grid-area: title;
	}
	.navigation {
		grid-area: navigation;
	}
	.main-img {
		grid-area: main-img;
	}
	.content {
		grid-area: content;
	}
	.img-attribution {
		grid-area: img-attribution;
		padding-top: 4px;
		padding-right: 8px;
	}
</style>
