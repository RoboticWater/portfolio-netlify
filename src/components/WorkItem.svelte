<script>
	// href={item.slug} title={item.data.title} date={item.data.date}
	export let href = '#';
	export let ghMetadata = null;
	export let title = 'Untitled post';
	export let date = 'no date';
	export let img = '';
</script>

<a sveltekit:prefetch class="work-item my-3" {href}>
	<div
		class="image-container grid overflow-hidden rounded-xl border-zinc-800 mb-3"
		class:border={!img}
	>
		<div class="image bg-cover bg-center" style={`background-image: url(${img})`} />
	</div>
	<div class="flex flex-col">
		<h1 class="text-4xl italic font-serif font-black text-zinc-800">{title}</h1>
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
	.image-container {
		height: 440px;
	}
	.image {
		transition: transform 0.3s cubic-bezier(0.26, 0.47, 0.04, 0.96);
	}
	a:hover .image {
		transform: scale(1.05);
	}
</style>
