<script lang="ts">
	import { stateBet, stateUi } from 'state-shared';
	import { getContext } from '../game/context';
	import { onMount } from 'svelte';

	const context = getContext();

	onMount(() => {
		if (stateBet.betToResume?.active && stateBet.betToResume.mode) {
			stateBet.activeBetModeKey = stateBet.betToResume.mode;
		}
		if (stateUi.config.mode === 'replay') return;
		context.eventEmitter.broadcast({ type: 'resumeBet' });
	});
</script>
