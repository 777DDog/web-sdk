<script lang="ts">
	import { OptionsGrid } from 'components-shared';
	import { getContextLayout } from 'utils-layout';
	import { stateBet, stateConfig } from 'state-shared';

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

	const { stateLayoutDerived } = getContextLayout();
	const count = $derived(stateLayoutDerived.layoutType() === 'landscape' ? 15 : 18);

	// [PATCH-D] Use actual max from betAmountOptions instead of betMenuOptions
	const actualMax = $derived(stateConfig.betAmountOptions[stateConfig.betAmountOptions.length - 1]);
	const options = $derived(
		[
			...stateConfig.betMenuOptions.slice(0, count - 1),
			actualMax,
		].filter((value, index, array) => array.indexOf(value) === index),
	); //always includes actual max from betAmountOptions, and without duplicate

	// [PATCH-D] Compare against actualMax
	const isMaxValue = (value: number) => value === actualMax;
	const formatValue = (value: number) => {
		if (Math.abs(value) > 999999) {
			return `${(Math.abs(value) / 1000000).toFixed(2)}M`;
		}
		if (Math.abs(value) > 999) {
			return `${(Math.abs(value) / 1000).toFixed(2)}K`;
		}
		return Math.abs(value).toFixed(2);
	};

	// [PATCH-D] Debug log on mount
	$effect(() => {
		// console.log('[PATCH-D] BetMenuAmountGrid derived:', {
		// 	count,
		// 	actualMax,
		// 	optionsLength: options.length,
		// 	options,
		// 	betAmountOptionsLength: stateConfig.betAmountOptions.length,
		// 	betMenuOptionsLength: stateConfig.betMenuOptions.length,
		// });
	});
</script>

<OptionsGrid
	value={stateBet.betAmount}
	{options}
	onchange={(value) => (stateBet.betAmount = value)}
>
	{#snippet option({ option })}
		<BaseIcon
			width="100%"
			height="2rem"
			border={option === stateBet.betAmount ? '2px white solid' : '2px black solid'}
		/>
		<BaseButtonContent>
			<span style="font-size: 1rem;"
				>{isMaxValue(option) ? i18nDerived.max() : formatValue(option)}</span
			>
		</BaseButtonContent>
	{/snippet}
</OptionsGrid>
