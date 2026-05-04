<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { BetModeData } from 'state-shared';

	import ModalError from './ModalError.svelte';
	import ModalBetMenu from './ModalBetMenu.svelte';
	import ModalBuyBonus from './ModalBuyBonus.svelte';
	import ModalBuyBonusConfirm from './ModalBuyBonusConfirm.svelte';
	import ModalAutoSpin from './ModalAutoSpin.svelte';
	import ModalAutoSpinMessage from './ModalAutoSpinMessage.svelte';
	import ModalPayTable from './ModalPayTable.svelte';
	import ModalGameRules from './ModalGameRules.svelte';
	import ModalSettings from './ModalSettings.svelte';

	type Props = {
		version: Snippet;
		payTableContent?: Snippet;
		gameRulesContent?: Snippet;
		// VC09 Path B (2026-05-04) — pass-through for buyBonus modal slots so the
		// game / brand layer can decorate cards (ribbon banners, cost-label
		// override). Backward-compat: omit = original SDK behaviour.
		buyBonusRibbon?: Snippet<[BetModeData]>;
		buyBonusCostLabel?: Snippet<[BetModeData]>;
	};

	const props: Props = $props();
</script>

<ModalError />
<ModalBetMenu />
<ModalBuyBonus ribbon={props.buyBonusRibbon} costLabel={props.buyBonusCostLabel} />
<ModalBuyBonusConfirm />
<ModalAutoSpin />
<ModalAutoSpinMessage />
<ModalPayTable content={props.payTableContent}>
	{@render props.version()}
</ModalPayTable>
<ModalGameRules content={props.gameRulesContent}>
	{@render props.version()}
</ModalGameRules>
<ModalSettings />

<style lang="scss">
	:global(html) {
		font-size: 16px; /* you can chose any size here 16 is default */
		@media screen and (max-width: 500px) {
			font-size: 75%;
		}
	}
</style>
