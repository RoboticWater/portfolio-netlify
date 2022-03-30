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
	import MainGraphic from '../components/MainGraphic.svelte';
	import { fade } from 'svelte/transition';
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

<section out:fade>
	<div class="graphic__container">
		<div class="graphic__align"><MainGraphic /></div>
	</div>
	<div class="about">
		<div class="large">
			<p>Hi, I'm John</p>
		</div>
		<div>
			<p class="my-4">I'm a designer, user researcher, and web developer located in Atlanta, GA.</p>
			<p class="my-4">
				Good design requires creative ambition and the technical competence to execute on vision, it
				calls for professionalism in application of ethics, and above all it demands compassion and
				rigor in the understanding of our fellow man.
			</p>
		</div>
	</div>
</section>

<style>
	.graphic__container {
		/* position: relative; */
		width: 100%;
		overflow: hidden;
		height: 100vh;
		position: fixed;
		z-index: -10;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* pointer-events: none; */
	}
	.graphic__align {
		position: relative;
		width: 10000px;
		left: 50%;
		margin: 0 0 0 -5000px;
		text-align: center;
	}
	.graphic__align > :global(.main-graphic) {
		height: 100vh;
	}
	@media screen and (max-width: 960px) {
		.graphic__align > :global(.main-graphic) :global(.text) {
			width: 150vw;
		}
	}
	.about {
		margin-top: 110vh;
		display: flex;
		/* align-items: center; */
		justify-content: center;
		margin-bottom: 40vh;
		padding: 60px;
		gap: 20px;
	}
	.about > div {
		max-width: 500px;
		flex: 1;
	}
	.about > div:first-child {
		text-align: center;
	}
	.large {
		font-size: 60px;
		font-weight: 700;
	}
	.large p {
		margin: 40px 0;
	}
</style>
