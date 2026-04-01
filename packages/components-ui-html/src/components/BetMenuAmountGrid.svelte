<script lang="ts">
	import { OptionsGrid } from 'components-shared';
	import { stateBet, stateConfig } from 'state-shared';

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';

	const options = $derived(stateConfig.betMenuOptions);

	const formatValue = (value: number) => {
		if (Math.abs(value) > 999999) {
			return `${(Math.abs(value) / 1000000).toFixed(2)}M`;
		}
		if (Math.abs(value) > 999) {
			return `${(Math.abs(value) / 1000).toFixed(2)}K`;
		}
		return Math.abs(value).toFixed(2);
	};
</script>

<OptionsGrid
	value={stateBet.betAmount}
	{options}
	onchange={(value) => (stateBet.betAmount = value)}
	isDisabled={(value) => value > stateBet.balanceAmount}
>
	{#snippet option({ option })}
		<BaseIcon
			width="100%"
			height="2rem"
			border={option === stateBet.betAmount ? '2px white solid' : '2px black solid'}
		/>
		<BaseButtonContent>
			<span style="font-size: 1rem;">{formatValue(option)}</span>
		</BaseButtonContent>
	{/snippet}
</OptionsGrid>
