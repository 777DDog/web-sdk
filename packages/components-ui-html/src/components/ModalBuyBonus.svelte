<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { getContextLayout } from 'utils-layout';
	import { stateModal, stateMetaDerived, type BetModeData } from 'state-shared';

	import BonusCards from './BonusCards.svelte';
	import BetMenuAmountToggle from './BetMenuAmountToggle.svelte';
	import BonusContentWrapLarge from './BonusContentWrapLarge.svelte';
	import BonusContentWrapPortrait from './BonusContentWrapPortrait.svelte';
	import BonusContentWrapLandscape from './BonusContentWrapLandscape.svelte';

	// VC09 Path B (2026-05-04) — optional pass-through Snippets so brand / game
	// layers can decorate each card with a ribbon and / or override the cost
	// display (e.g. Ante "+100% per play" vs BB "X× cost"). Backward-compat:
	// omit both = original SDK behaviour.
	type Props = {
		ribbon?: Snippet<[BetModeData]>;
		costLabel?: Snippet<[BetModeData]>;
	};

	const props: Props = $props();
	const { stateLayoutDerived } = getContextLayout();

	const activateList = $derived(
		stateMetaDerived.betModeMetaList().filter((item) => item.type === 'activate'),
	);

	const buyList = $derived(
		stateMetaDerived.betModeMetaList().filter((item) => item.type === 'buy'),
	);

	const COMPONENT_MAP = {
		desktop: BonusContentWrapLarge,
		tablet: BonusContentWrapLarge,
		portrait: BonusContentWrapPortrait,
		landscape: BonusContentWrapLandscape,
	} as const;

	const BonusContentWrap = $derived(COMPONENT_MAP[stateLayoutDerived.layoutType()]);
</script>

{#if stateModal.modal?.name === 'buyBonus'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BonusContentWrap maxListLength={Math.max(activateList.length, buyList.length)}>
			{#snippet betAmount()}
				<BetMenuAmountToggle />
			{/snippet}

			{#snippet bonusCardsActivate()}
				<BonusCards list={activateList} ribbon={props.ribbon} costLabel={props.costLabel} />
			{/snippet}

			{#snippet bonusCardsBuy()}
				<BonusCards list={buyList} ribbon={props.ribbon} costLabel={props.costLabel} />
			{/snippet}
		</BonusContentWrap>
	</Popup>
{/if}
