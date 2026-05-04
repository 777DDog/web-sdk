<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: Snippet;
		image?: Snippet;
		description: Snippet;
		price: Snippet;
		button: Snippet;
		// VC09 Path B (2026-05-04) — optional ribbon banner above the card.
		// Game-side passes a Snippet to render a brand-styled ribbon
		// (e.g. MOST POPULAR / TIME SAVER / MAX WIN HUNTER). Backward-compat:
		// games that don't pass `ribbon` get the original cardless layout.
		ribbon?: Snippet;
	};

	const props: Props = $props();
</script>

<div class="bonus-card-wrap" class:has-ribbon={!!props.ribbon}>
	{#if props.ribbon}
		<div class="ribbon">{@render props.ribbon()}</div>
	{/if}
	<div class="info">
		{@render props.title()}
		{#if props.image}{@render props.image()}{/if}
		{@render props.description()}
		{@render props.price()}
	</div>
	{@render props.button()}
</div>

<style lang="scss">
	.bonus-card-wrap {
		padding: 0.5rem;
		flex-direction: column;
		display: flex;
		justify-content: space-between;

		border-radius: 10px;
		background: rgba(0, 0, 0, 0.5);
		text-align: left;
		min-width: 155px;
		max-width: 180px;
		gap: 0.5rem;
		position: relative;
	}

	.bonus-card-wrap.has-ribbon {
		padding-top: 1.25rem;
	}

	.ribbon {
		position: absolute;
		top: -0.5rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
		pointer-events: none;
		white-space: nowrap;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
