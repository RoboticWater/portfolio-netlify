<script>
	// href={item.slug} title={item.data.title} date={item.data.date}
	export let href = '#';
	export let ghMetadata = null;
	export let title = 'Untitled post';
	export let date = 'no date';
</script>

<a sveltekit:prefetch class="work-item my-3" {href}>
	<div class="image rounded-xl border-zinc-800 border mb-3"><img src="" alt="" /></div>
	<div class="flex flex-col">
		<h1 class="text-4xl uppercase italic font-serif font-black text-zinc-800">{title}</h1>
		<div class="meta flex items-center gap-2 text-zinc-800 text-mono">
			<div>2021</div>
			<div class="w-1 h-1 rounded bg-zinc-800" />
			<div>UX Research</div>
			<div class="w-1 h-1 rounded bg-zinc-800" />
			<div>Balsamiq Prototype</div>
		</div>
	</div>
</a>

<style>
	.work-item {
		max-width: 400px;
	}
	.image {
		height: 440px;
	}
</style>
