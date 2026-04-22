<script lang="ts">
	import { stateBet, stateModal, type BetModeData } from 'state-shared';
	import { Button } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BaseIcon from './BaseIcon.svelte';
	import BonusCard from './BonusCard.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';
	import { stateBonus } from '../stateBonus.svelte';
	import type { EmitterEventModal } from '../types';

	type Props = {
		list: BetModeData[];
	};

	const props: Props = $props();
	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
</script>

{#each props.list as betModeData}
	{#if betModeData.type !== 'default'}
		<BonusCard>
			{#snippet title()}
				<div class="title">
					{betModeData.text.title}
				</div>
			{/snippet}

			{#snippet image()}
				{#if betModeData.assets.dialogImage}
					<img
						class="image"
						src={betModeData.assets.dialogImage}
						alt={betModeData.text.title}
					/>
				{/if}
			{/snippet}

			{#snippet description()}
				{#if betModeData?.text?.description}
					<div class="description">
						{betModeData.text.description}
					</div>
				{/if}
			{/snippet}

			{#snippet price()}
				<div class="price">
					{`${numberToCurrencyString(stateBet.betAmount * betModeData.costMultiplier)}`}
				</div>
			{/snippet}

			{#snippet button()}
				{@const insufficientBalance = stateBet.balanceAmount < stateBet.betAmount * betModeData.costMultiplier}
				<Button
					onclick={() => {
						stateBonus.selectedBetModeKey = betModeData.mode;
						eventEmitter.broadcast({ type: 'buyBonusConfirm' });
						eventEmitter.broadcast({ type: 'soundPressGeneral' });
					}}
					disabled={stateBet.betAmount <= 0 || insufficientBalance}
				>
					<BaseIcon width="100%" height="2rem" border="2px solid white;" />
					<BaseButtonContent>
						<span style="font-size: 1rem;">{betModeData.text.button}</span>
					</BaseButtonContent>
				</Button>
				{#if insufficientBalance}
					<div class="insufficient-balance">INSUFFICIENT BALANCE</div>
				{/if}
			{/snippet}
		</BonusCard>
	{/if}
{/each}

<style lang="scss">
	.title {
		font-size: 1rem;
		line-height: 1rem;
		text-align: center;
	}

	.image {
		display: block;
		margin: 0 auto;
		max-width: 100%;
		max-height: 6rem;
		object-fit: contain;
	}

	.description {
		font-size: 0.75rem;
		text-align: center;
		min-height: 4rem;
		white-space: pre-line;
		display: inline-flex;
		align-items: center;
	}

	.description:empty {
		display: none;
	}

	.price {
		font-size: 1.25rem;
		line-height: 1.25rem;
		text-align: center;
		white-space: nowrap;
		color: #ffd700;
		font-weight: 700;
	}

	.insufficient-balance {
		font-size: 0.7rem;
		text-align: center;
		color: #ff4444;
		font-weight: 600;
		margin-top: 0.25rem;
	}
</style>
