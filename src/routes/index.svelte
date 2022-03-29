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
</script>

<script>
	import Newsletter from '../components/Newsletter.svelte';
	import FeatureCard from '../components/FeatureCard.svelte';
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

<div
	class="main grid place-content-center text-center leading-none text-9xl uppercase italic font-serif font-black h-screen gap-3 fixed top-0 left-0 right-0 bottom-0"
>
	<h1>Research</h1>
	<h1>Development</h1>
	<h1>Design</h1>
	<!-- <div
		class="shade absolute top-0 left-0 right-0 bottom-0"
		style={`backdrop-filter: blur(${
			Math.min((5 * y) / window.innerHeight, 1) * 50
		}px); background-color: rgba(255, 255, 255, ${(y / window.innerHeight) * 0.1});`}
	/> -->
</div>
<div class="description mb-36">
	<p>Hi, I'm John, a Developer turned designer turned researcher</p>
</div>

<style>
	.main {
		z-index: -1;
	}
	.description {
		margin-top: 100vh;
	}
</style>
