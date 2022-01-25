<script>
	export let name;
	export let list;
</script>

<div class="meta-list">
	<h2 class="font-mono font-medium uppercase text-sm mb-2 tracking-wider">{name}</h2>
	<ul>
		{#each list as tag, i}
			<li class="font-mono text-zinc-600 text-xs mb-1">
				{tag}
			</li>
		{/each}
	</ul>
</div>
