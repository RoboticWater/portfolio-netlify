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

	export let page;
	export let list;
	export let items;

	const PAGE_SIZE = 30;

	$: start = 1 + (page - 1) * PAGE_SIZE;
	$: next = `/${list}/${+page + 1}`;

	let isTruncated = items.list.length > 20;
	let search;
	$: list = items.list
		.filter((item) => {
			if (search) {
				return item.title.toLowerCase().includes(search.toLowerCase());
			}
			return true;
		})
		.slice(0, isTruncated ? 2 : items.list.length);
</script>

<svelte:head>
	<title>Works | John Britti</title>
	<meta name="description" content="Latest Hacker News stories in the {list} category" />
</svelte:head>

<section class="flex">
	{#if list.length}
		<WorkItem href={list[0].slug} title={list[0].title} img={list[0].data.img} />
		<div class="flex-1 grid content-center justify-center font-bold text-5xl">
			<div class="description">{list[0].subtitle}</div>
		</div>
	{/if}
	<!-- <div class="flex flex-col">
		{#if list.length}
			<ul class="">
				{#each list as item}
					<li class="mb-8 text-lg">
						<IndexCard
							href={item.slug}
							title={item.title}
							date={new Date(item.date).toISOString().slice(0, 10)}
							ghMetadata={item.ghMetadata}
						>
							{item.description}
						</IndexCard>
					</li>
				{/each}
			</ul>
			{#if isTruncated}
				<div class="flex justify-center">
					<button
						on:click={() => (isTruncated = false)}
						class="inline-block text-lg font-bold tracking-tight text-black md:text-2xl dark:text-white bg-blue-100 dark:bg-blue-900 rounded p-4 hover:text-yellow-900 hover:dark:text-yellow-200"
					>
						Load More Posts...
					</button>
				</div>
			{/if}
		{/if}
	</div>
	<div class="flex">
		{0}
	</div> -->
</section>

<style>
	section {
		padding: 0 220px 0 220px;
	}
</style>
