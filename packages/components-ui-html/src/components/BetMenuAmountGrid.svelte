<script lang="ts">
	import { OptionsGrid } from 'components-shared';
	import { stateBet, stateBetDerived, stateConfig } from 'state-shared';
	import { getCurrencyDecimals } from 'utils-shared/amount';

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';

	const options = $derived(stateConfig.betMenuOptions);
	// T104 — affordability respects per-mode costMultiplier (Mythic 2× / Forge per-step etc).
	// `level × costMultiplier ≤ balance` is the correct affordability test, not just `level ≤ balance`.
	const costMultiplier = $derived(stateBetDerived.betCostMultiplier());

	// T90: shorthand (M/K) must keep ≥ 1 decimal so 0-decimal currencies
	// (KRW/JPY) don't round 1.5M → "2M" via toFixed(0). Integer values
	// drop the trailing .0 so $2M still reads as "2M". Sub-1K values keep
	// the currency's native decimals (USD: 2, KRW: 0, etc).
	const formatShort = (n: number) => {
		if (Number.isInteger(n)) return `${n}`;
		return n.toFixed(1);
	};
	const formatValue = (value: number) => {
		const decimals = getCurrencyDecimals();
		const abs = Math.abs(value);
		if (abs > 999999) {
			return `${formatShort(abs / 1000000)}M`;
		}
		if (abs > 999) {
			return `${formatShort(abs / 1000)}K`;
		}
		return abs.toFixed(decimals);
	};
</script>

<OptionsGrid
	value={stateBet.betAmount}
	{options}
	onchange={(value) => stateBetDerived.setBetAmount(value)}
	isDisabled={(value) => value * costMultiplier > stateBet.balanceAmount}
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
