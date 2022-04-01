<script context="module">
	// export const prerender = true; // you can uncomment to prerender as an optimization
	import * as cheerio from 'cheerio';
	export const hydrate = true;
	import { REPO_URL, SITE_URL } from '$lib/siteConfig';
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
		//@ts-ignore
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
	<!-- <meta name="twitter:creator" content="https://twitter.com/swyx/" /> -->
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={json.description} />
	{#if json.image}
		<meta property="og:image" content={json.image} />
		<meta name="twitter:image" content={json.image} />
	{/if}
</svelte:head>

<svelte:window bind:scrollY={y} on:hashchange={() => (currentEntry = location.hash)} />

<article class="grid pb-80">
	<div class="navigation justify-self-end px-2 pt-8">
		<nav class="sticky top-7 w-36 inline-block" class:active={hamburgerToggle}>
			<h2 class="font-mono font-medium uppercase text-sm mb-2 tracking-wider">Sections</h2>
			<ul>
				{#each sections as section}
					<li class="font-mono text-zinc-600 text-xs mb-1">
						<a class="flex" href={section.hash}>
							<div
								class="arrow grid items-center fill-zinc-600 overflow-hidden"
								class:active={section.hash === currentEntry}
							>
								<svg
									width="8"
									height="6"
									viewBox="0 0 8 6"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M4.70915 5.65097L4.05396 4.99579L5.22783 3.82192L5.91032 3.24863L5.89667 3.20768L4.5863 3.28958H0V2.3614H4.5863L5.89667 2.4433L5.91032 2.40235L5.22783 1.82906L4.05396 0.655186L4.70915 0L7.53463 2.82549L4.70915 5.65097Z"
										fill="#555555"
									/>
								</svg>
							</div>
							{section.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
	<div class="main-img relative">
		<div class="title z-10 grid items-center absolute">
			<div class="title-container relative">
				<h1 class="italic font-serif font-black text-zinc-800 text-7xl">
					<a href="#description" class="py-2 pr-5 bg-white relative">
						{title}
						<span class="backdrop absolute -right-4 -bottom-4 top-4 left-4 bg-blue-500 -z-10" />
					</a>
				</h1>
				<div class="tagline mt-7 font-mono max-w-md">
					<span class="tagline-text bg-white ">{subtitle}</span>
				</div>
			</div>
		</div>
		<div class="overflow-hidden w-full h-full relative" style={`top: ${y * 0.3}px`}>
			<div
				class="inner-img relative bg-center rounded-bl-lg w-full h-full"
				style={`background-image: url(${img});`}
			/>
			<div class="attribution ext-right font-mono text-xs absolute bottom-2 right-2">
				{#if imgAttributionAuthor}
					<a class="text-zinc-800 underline" target="__blank" href={imgAttributionLink}>Image</a>
					by {imgAttributionAuthor}
				{/if}
			</div>
		</div>
	</div>
	<div class="content bg-white pt-8 rounded-tr-lg pr-8 relative">
		<div class="max-w-screen-sm">
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
	</div>
</article>
<div
	class="hamburger"
	on:click={() => (hamburgerToggle = !hamburgerToggle)}
	class:active={hamburgerToggle}
/>

<style>
	article {
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: 540px 1fr;
		grid-template-areas: '. main-img main-img' 'navigation content .';
		animation: fade-article 800ms cubic-bezier(0.33, 0.43, 0.04, 0.97);
	}
	.title {
		grid-area: title;
		left: -120px;
		top: 50%;
		transform: translateY(-50%);
	}
	.title-container {
		animation: fade-title 500ms cubic-bezier(0.33, 0.43, 0.04, 0.97);
	}
	.title {
		/* grid-area: title;
		width: 180px;
		position: relative;
		justify-self: flex-end; */
		transition: all 0.2s ease;
	}
	/* .title-container {
		position: absolute;
		top: 25%;
		width: 640px;
	}
	.title h1 {
		display: inline;
		position: relative;
		z-index: 10;
		transition: font-size 0.2s ease;
	}
	.title .bg {
		position: absolute;
		top: 10px;
		left: 10px;
		right: -10px;
		bottom: -10px;
		z-index: -1;
	} */
	.tagline-text {
		box-shadow: -16px 0 0 #fff;
		padding: 8px 10px;
		padding-left: 0px;
		white-space: pre-wrap;
		left: 16px;
		position: relative;
		line-height: 28px;
	}
	.content {
		grid-area: content;
	}
	.content:after {
		content: '';
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		left: 0;
		top: -0.5rem;
		background: radial-gradient(circle at 100% 0, #fff0 0.5rem, #fff 0px);
		z-index: 10;
	}
	.navigation {
		grid-area: navigation;
	}
	.arrow {
		width: 0px;
		transition: width 0.15s ease;
	}
	.arrow.active {
		width: 10px;
	}
	.main-img {
		grid-area: main-img;
	}
	.attribution {
		mix-blend-mode: exclusion;
		color: #fff;
	}
	.attribution a {
		color: #fff;
	}
	.prose :global(h2 a) {
		text-decoration: none;
		/* font-weight: 600; */
	}
	.hamburger {
		top: 0;
		left: 0;
		width: 48px;
		height: 56px;
		background: #fff;
		position: fixed;
		border-bottom-right-radius: 0.375rem;
		z-index: 300;
		cursor: pointer;
		display: none;
	}
	.hamburger:after {
		content: '';
		background: #333;
		position: absolute;
		top: 38%;
		left: 8px;
		right: 8px;
		height: 1px;
		transform: translateY(-50%);
		transition: all 0.3s cubic-bezier(0.55, 0.53, 0.01, 0.98);
	}
	.hamburger:before {
		content: '';
		background: #333;
		position: absolute;
		top: 62%;
		left: 8px;
		right: 8px;
		height: 1px;
		transform: translateY(-50%);
		transition: all 0.3s cubic-bezier(0.55, 0.53, 0.01, 0.98);
	}
	.hamburger:hover:after {
		right: 16px;
	}
	.hamburger.active:after {
		top: 50%;
		left: 12px;
		right: 12px;
		transform: translateY(-50%) rotate(-135deg);
	}
	.hamburger.active:before {
		top: 50%;
		left: 12px;
		right: 12px;
		transform: translateY(-50%) rotate(135deg);
	}
	@media screen and (max-width: 640px) {
		.title {
			left: -10px;
		}
		h1 {
			font-size: 10vw;
		}
		.backdrop {
			left: 2vw;
			top: 2vw;
			right: -2vw;
			bottom: -2vw;
		}
		.tagline {
			margin-top: 5.5vw;
		}
		.navigation nav {
			position: fixed;
			background: #fff;
			width: auto;
			padding: 1rem;
			z-index: 300;
			top: 30px;
			left: -10px;
			opacity: 0;
			pointer-events: none;
			transition: top 0.2s cubic-bezier(0.55, 0.53, 0.01, 0.98),
				left 0.2s cubic-bezier(0.55, 0.53, 0.01, 0.98), opacity 0.2s ease;
		}
		.navigation nav.active {
			opacity: 1;
			top: 60px;
			left: 10px;
			pointer-events: all;
		}
		.hamburger {
			display: block;
		}
	}
	@media screen and (max-width: 564px) {
		h1 {
			font-size: 10vw;
		}
		.tagline {
			font-size: 3.5vw;
			max-width: 70vw;
		}
	}
	@keyframes fade-article {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fade-title {
		from {
			top: -80px;
		}
		to {
			top: 0;
		}
	}
	@keyframes fade-content {
		from {
			top: 80px;
		}
		to {
			top: 0;
		}
	}
	@keyframes fade-image {
		from {
			transform: scale(1.2);
		}
		to {
			transform: scale(1);
		}
	}
</style>
