<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	import { requestAuthenticate, requestReplay } from 'rgs-requests';
	import { stateUrlDerived, stateBet, stateConfig, stateModal, stateUi } from 'state-shared';
	import { API_AMOUNT_MULTIPLIER, MOST_USED_BET_INDEXES } from 'constants-shared/bet';

	type Props = { children: Snippet };

	const props: Props = $props();

	let authenticated = $state(false);

	const authenticate = async () => {
		try {
			// console.log('[PATCH-A] authenticate() START');
			const authenticateData = await requestAuthenticate({
				rgsUrl: stateUrlDerived.rgsUrl(),
				sessionID: stateUrlDerived.sessionID(),
				language: stateUrlDerived.lang(),
			});
			// console.log('[PATCH-A] authenticate() got response');

			// error
			if (authenticateData?.error) throw authenticateData;

			// balance
			if (authenticateData?.balance) {
				stateBet.currency = authenticateData.balance.currency;
				stateBet.balanceAmount = authenticateData.balance.amount / API_AMOUNT_MULTIPLIER;
				// console.log('[PATCH-A] balance set:', stateBet.currency, stateBet.balanceAmount);
			}

			// config
			if (authenticateData?.config) {
				// console.log('[PATCH-B] config START');
				// console.log('[PATCH-B] RGS config:', JSON.stringify(authenticateData.config, null, 2));
				// console.log('[PATCH-B] betLevels (raw):', authenticateData.config?.betLevels);
				// console.log('[PATCH-B] defaultBetLevel (raw):', authenticateData.config?.defaultBetLevel);
				// console.log('[PATCH-B] currency:', authenticateData.balance?.currency);

				stateConfig.jurisdiction = authenticateData?.config?.jurisdiction;
				stateConfig.betAmountOptions = (authenticateData.config?.betLevels || []).map(
					(level) => level / API_AMOUNT_MULTIPLIER,
				);
				stateConfig.betMenuOptions = stateConfig.betAmountOptions.filter((_, index) =>
					MOST_USED_BET_INDEXES.includes(index),
				);
				console.log('[BUG3] RGS betLevels (raw):', authenticateData.config?.betLevels);
				console.log('[BUG3] betAmountOptions (all):', stateConfig.betAmountOptions.map((v, i) => `[${i}]=${v}`));
				console.log('[BUG3] MOST_USED_BET_INDEXES:', MOST_USED_BET_INDEXES);
				console.log('[BUG3] betMenuOptions (filtered):', stateConfig.betMenuOptions);

				// Apply defaultBetLevel from RGS config
				// console.log('[PATCH-C] defaultBetLevel logic START');
				if (authenticateData.config?.defaultBetLevel) {
					const defaultBet = authenticateData.config.defaultBetLevel / API_AMOUNT_MULTIPLIER;
					if (stateConfig.betAmountOptions.includes(defaultBet)) {
						stateBet.betAmount = defaultBet;
						stateConfig.defaultBetAmount = defaultBet;
					}
				} else {
					// console.log('[PATCH-C] no defaultBetLevel in config');
				}
				// console.log('[PATCH-C] defaultBetLevel logic END');

				// console.log('[PATCH-B] config END');
			}

			// round
			// console.log('[PATCH-A] round check START');
			// console.log('[PATCH-A] authenticateData:', JSON.stringify(authenticateData, null, 2));
			if (authenticateData?.round) {
				// console.log('[PATCH-A] has round:', JSON.stringify(authenticateData.round));

				if(authenticateData.round?.state) {
					// @ts-ignore
					stateBet.betToResume =  authenticateData.round;
				}

				if(authenticateData.round?.amount) {
					const betAmountValue =
						authenticateData.round.amount > 0
							? authenticateData.round.amount / API_AMOUNT_MULTIPLIER
							: 0;
					stateBet.betAmount = betAmountValue;
					stateBet.wageredBetAmount = betAmountValue;
				}

				if (authenticateData.round?.mode) {
					stateBet.activeBetModeKey = authenticateData.round.mode;
				};
			} else {
				// console.log('[PATCH-A] no active round');
			}

			// Safety: if no active round and bet exceeds balance, reset to default
			if (!authenticateData?.round && stateBet.betAmount > stateBet.balanceAmount) {
				stateBet.betAmount = stateConfig.defaultBetAmount;
			}

			// console.log('[PATCH-A] authenticate() END, betAmount:', stateBet.betAmount);
		} catch (error) {
			// console.error('[PATCH-A] authenticate() ERROR:', error);
			stateModal.modal = { name: 'error', error };
		}
	};

	const handleReplay = async () => {
		// console.log('[REPLAY] handleReplay START');
		// console.log('[REPLAY] URL params:', {
		// 	replay: stateUrlDerived.replay(),
		// 	game: stateUrlDerived.game(),
		// 	mode: stateUrlDerived.mode(),
		// 	version: stateUrlDerived.version(),
		// 	event: stateUrlDerived.event(),
		// 	amount: stateUrlDerived.amount(),
		// 	lang: stateUrlDerived.lang(),
		// 	rgsUrl: stateUrlDerived.rgsUrl(),
		// });

		// Set currency from URL param; default to XGC for social mode, USD otherwise
		const urlCurrency = stateUrlDerived.currency();
		if (urlCurrency) {
			stateBet.currency = urlCurrency;
		} else if (stateUrlDerived.social()) {
			stateBet.currency = 'XGC';
		}

		stateBet.betAmount = (stateUrlDerived.amount() / API_AMOUNT_MULTIPLIER) || 0;
		stateBet.wageredBetAmount = (stateUrlDerived.amount() / API_AMOUNT_MULTIPLIER) || 0;
		stateBet.activeBetModeKey = stateUrlDerived.mode();
		// console.log('[REPLAY] betAmount:', stateBet.betAmount, 'mode:', stateBet.activeBetModeKey);

		try {
			const data = await requestReplay({
				rgsUrl: stateUrlDerived.rgsUrl(),
				game: stateUrlDerived.game(),
				mode: stateUrlDerived.mode(),
				version: stateUrlDerived.version(),
				event: stateUrlDerived.event(),
				lang: stateUrlDerived.lang(),
			});
			// console.log('[REPLAY] RGS response:', JSON.stringify(data, null, 2));

			if(data) {
				// @ts-ignore
				stateBet.betToResume = {
					...data,
					event: '0',
					active: true,
					mode: stateUrlDerived.mode(),
				};
				// console.log('[REPLAY] betToResume set:', {
				// 	active: true,
				// 	mode: stateUrlDerived.mode(),
				// 	payoutMultiplier: (data as any)?.payoutMultiplier,
				// 	stateLength: (data as any)?.state?.length,
				// });
			} else {
				console.warn('Replay: RGS returned no data');
			}
		} catch (error) {
			console.error('Replay requestReplay error:', error);
		}

		// console.log('[REPLAY] handleReplay END');
	};

	onMount(async () => {
		// console.log('[REPLAY] onMount START, replay?', stateUrlDerived.replay());
		// console.log('[REPLAY] stateUi.config.mode:', stateUi.config.mode);
		if(stateUrlDerived.replay()) {
			stateUi.config.mode = 'replay';
			// console.log('[REPLAY] mode set to replay, calling handleReplay...');
			await handleReplay();
		} else {
			stateUi.config.mode = 'default';
			await authenticate();
		};

		authenticated = true;
		// console.log('[REPLAY] onMount END, authenticated =', authenticated);
		// console.log('[REPLAY] final state:', {
		// 	'stateUi.config.mode': stateUi.config.mode,
		// 	'stateUi.replayStarted': stateUi.replayStarted,
		// 	'stateUi.replayCompleted': stateUi.replayCompleted,
		// 	'betToResume.active': (stateBet.betToResume as any)?.active,
		// 	'betAmount': stateBet.betAmount,
		// });
	});
</script>

{#if authenticated}
	{@render props.children()}
{/if}
