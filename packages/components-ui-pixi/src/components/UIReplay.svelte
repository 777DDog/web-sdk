<script lang="ts">
	import { EnableSpaceHold } from 'components-shared';

	import UiFadeContainer from './UiFadeContainer.svelte';
	import LabelWin from './LabelWin.svelte';
	import LabelBet from './LabelBet.svelte';
	import ButtonPayTable from './ButtonPayTable.svelte';
	import ButtonGameRules from './ButtonGameRules.svelte';
	import ButtonSettings from './ButtonSettings.svelte';
	import ButtonTurbo from './ButtonTurbo.svelte';
	import ButtonMenu from './ButtonMenu.svelte';
	import ButtonMenuClose from './ButtonMenuClose.svelte';
	import ButtonSoundSwitch from './ButtonSoundSwitch.svelte';
	import { stateUi, stateBet, stateBetDerived } from 'state-shared';
	import { BLACK, WHITE } from 'constants-shared/colors';
	import { MainContainer } from 'components-layout';
	import { Container, Rectangle, Text } from 'pixi-svelte';
	import { getContext } from '../context';
	import type { LayoutUiProps } from '../types';
	import LabelFreeSpinCounter from './LabelFreeSpinCounter.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { numberToCurrencyString } from 'utils-shared/amount';

	type Props = {
		gameName: LayoutUiProps['gameName'];
		logo: LayoutUiProps['logo'];
	};

	const props: Props = $props();
	const context = getContext();

	// Capture payoutMultiplier before state machine clears betToResume
	let capturedPayoutMultiplier = $state(0);
	$effect(() => {
		const pm = (stateBet.betToResume as any)?.payoutMultiplier;
		if (pm !== undefined && pm !== null) {
			capturedPayoutMultiplier = pm;
		}
	});

	// Replay info derived values
	const baseBetValue = $derived(numberToCurrencyString(stateBet.betAmount));
	const costMultiplier = $derived(stateBetDerived.activeBetMode()?.costMultiplier ?? 1);
	const totalBetCost = $derived(numberToCurrencyString(stateBet.betAmount * costMultiplier));
	const totalWin = $derived(numberToCurrencyString(stateBet.betAmount * capturedPayoutMultiplier));
	const modeDisplay = $derived(stateBet.activeBetModeKey.toUpperCase());

	// Canvas dimensions
	const cw = $derived(context.stateLayoutDerived.canvasSizes().width);
	const ch = $derived(context.stateLayoutDerived.canvasSizes().height);

	// Styles
	const infoLabelStyle = {
		fontFamily: 'Source Sans 3',
		fontSize: 20,
		fill: 0xaaaaaa,
	} as const;

	const infoStyle = {
		fontFamily: 'Source Sans 3',
		fontSize: 20,
		fill: WHITE,
	} as const;

	const infoHighlightStyle = {
		fontFamily: 'Source Sans 3',
		fontSize: 22,
		fill: 0x22c55e,
		fontWeight: '600',
	} as const;

	const badgeStyle = {
		fontFamily: 'Source Sans 3',
		fontSize: 16,
		fill: WHITE,
		fontWeight: '700',
	} as const;

	const titleStyle = {
		fontFamily: 'Source Sans 3',
		fontSize: 28,
		fill: WHITE,
		fontWeight: '600',
	} as const;

	const startButtonStyle = {
		fontFamily: 'Source Sans 3',
		fontSize: 26,
		fill: BLACK,
		fontWeight: '600',
	} as const;

	const replayButtonStyle = {
		fontFamily: 'Source Sans 3',
		fontSize: 32,
		fill: WHITE,
	} as const;

	const disclaimerStyle = {
		fontFamily: 'Source Sans 3',
		fontSize: 13,
		fill: 0x888888,
	} as const;

	const onStartReplay = () => {
		stateUi.replayStarted = true;
		context.eventEmitter.broadcast({ type: 'resumeBet' });
	};

	const onReplay = () => {
		window.location.reload();
	};
</script>

<EnableSpaceHold />

<UiFadeContainer>
	<Container x={20}>
		{@render props.gameName()}
	</Container>

	<Container x={context.stateLayoutDerived.canvasSizes().width - 20}>
		{@render props.logo()}
	</Container>

	<!-- Replay Info: Base Bet / Cost Multiplier / Payout Multiplier (visible during playback) -->
	{#if stateUi.replayStarted}
		<MainContainer standard>
			<Container x={20} y={80}>
				<Text anchor={{ x: 0, y: 0 }} text={i18nDerived.replayBaseBet()} style={infoLabelStyle} />
				<Text anchor={{ x: 0, y: 0 }} text={baseBetValue} style={infoStyle} x={220} />

				<Text anchor={{ x: 0, y: 0 }} text={i18nDerived.replayCostMultiplier()} style={infoLabelStyle} y={30} />
				<Text anchor={{ x: 0, y: 0 }} text={`${costMultiplier}×`} style={infoStyle} x={220} y={30} />

				<Text anchor={{ x: 0, y: 0 }} text={i18nDerived.replayPayoutMultiplier()} style={infoLabelStyle} y={60} />
				<Text anchor={{ x: 0, y: 0 }} text={`${capturedPayoutMultiplier}×`} style={infoStyle} x={220} y={60} />
			</Container>
		</MainContainer>
	{/if}

	<MainContainer standard alignVertical="bottom">
		{#if stateUi.freeSpinCounterShow && ['portrait', 'tablet'].includes(context.stateLayoutDerived.layoutType())}
			<Container x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5} y={120}>
				<LabelFreeSpinCounter stacked />
			</Container>
		{/if}

		<!-- Replay Button (appears when replay completes) -->
		{#if stateUi.replayCompleted}
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
				y={context.stateLayoutDerived.mainLayoutStandard().height * 0.5 - 50}
				eventMode="static"
				cursor="pointer"
				onpointerup={onReplay}
			>
				<Rectangle
					anchor={0.5}
					backgroundColor={0x2563eb}
					width={240}
					height={70}
					borderRadius={12}
				/>
				<Text anchor={0.5} text={i18nDerived.replayButton()} style={replayButtonStyle} />
			</Container>
		{/if}

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 270}
			scale={0.8}
		>
			<LabelWin stacked />
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 150}
			scale={0.8}
		>
			<LabelBet stacked />
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 270 - 15}
			scale={0.7}
		>
			<ButtonMenu />
		</Container>

		<Container
			x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350}
			y={context.stateLayoutDerived.mainLayoutStandard().height - 150 - 15}
			scale={0.7}
		>
			<ButtonTurbo />
		</Container>
	</MainContainer>

	{#if stateUi.menuOpen}
		<Rectangle
			eventMode="static"
			cursor="pointer"
			alpha={0.5}
			anchor={0.5}
			backgroundColor={BLACK}
			width={cw}
			height={ch}
			x={cw * 0.5}
			y={ch * 0.5}
			onpointerup={() => (stateUi.menuOpen = false)}
		/>

		<MainContainer standard alignVertical="bottom">
			<Container
				x={context.stateLayoutDerived.mainLayoutStandard().width * 0.5 - 350}
				y={context.stateLayoutDerived.mainLayoutStandard().height - 270 - 15}
			>
				<Container scale={0.8} y={0 * 0.5 - 150 - 170 * 3}>
					<ButtonPayTable anchor={0.5} />
				</Container>

				<Container scale={0.8} y={0 * 0.5 - 150 - 170 * 2}>
					<ButtonGameRules anchor={0.5} />
				</Container>

				<Container scale={0.8} y={0 * 0.5 - 150 - 170 * 1}>
					<ButtonSettings anchor={0.5} />
				</Container>

				<Container scale={0.8} y={0 * 0.5 - 150}>
					<ButtonSoundSwitch anchor={0.5} />
				</Container>

				<Container scale={0.8} y={0 * 0.5}>
					<ButtonMenuClose anchor={0.5} />
				</Container>
			</Container>
		</MainContainer>
	{/if}

	<!-- Landing Screen Overlay (shown before replay starts) -->
	{#if !stateUi.replayStarted}
		<Rectangle
			eventMode="static"
			anchor={0.5}
			backgroundColor={0x0f172a}
			alpha={0.92}
			width={cw}
			height={ch}
			x={cw * 0.5}
			y={ch * 0.5}
		/>

		<Container x={cw * 0.5} y={ch * 0.5 - 40}>
			<!-- REPLAY badge -->
			<Rectangle anchor={0.5} backgroundColor={0x2563eb} width={120} height={32} borderRadius={16} y={-210} />
			<Text anchor={0.5} text="REPLAY" style={badgeStyle} y={-210} />

			<!-- Title -->
			<Text anchor={0.5} text={i18nDerived.replayTitle()} style={titleStyle} y={-165} />

			<!-- Info card background -->
			<Rectangle anchor={0.5} backgroundColor={0x1e293b} width={360} height={230} borderRadius={12} y={-20} />

			<!-- Info rows -->
			<Text anchor={{ x: 0, y: 0.5 }} text={i18nDerived.replayMode()} style={infoLabelStyle} x={-155} y={-100} />
			<Text anchor={{ x: 1, y: 0.5 }} text={modeDisplay} style={infoStyle} x={155} y={-100} />

			<Text anchor={{ x: 0, y: 0.5 }} text={i18nDerived.replayBaseBet()} style={infoLabelStyle} x={-155} y={-65} />
			<Text anchor={{ x: 1, y: 0.5 }} text={baseBetValue} style={infoStyle} x={155} y={-65} />

			<Text anchor={{ x: 0, y: 0.5 }} text={i18nDerived.replayCostMultiplier()} style={infoLabelStyle} x={-155} y={-30} />
			<Text anchor={{ x: 1, y: 0.5 }} text={`${costMultiplier}x`} style={infoStyle} x={155} y={-30} />

			<!-- Total Bet Cost (highlighted) -->
			<Rectangle anchor={0.5} backgroundColor={0x334155} width={340} height={30} borderRadius={6} y={5} />
			<Text anchor={{ x: 0, y: 0.5 }} text={i18nDerived.replayTotalBetCost()} style={infoLabelStyle} x={-155} y={5} />
			<Text anchor={{ x: 1, y: 0.5 }} text={totalBetCost} style={infoHighlightStyle} x={155} y={5} />

			<Text anchor={{ x: 0, y: 0.5 }} text={i18nDerived.replayPayoutMultiplier()} style={infoLabelStyle} x={-155} y={40} />
			<Text anchor={{ x: 1, y: 0.5 }} text={`${capturedPayoutMultiplier}x`} style={infoStyle} x={155} y={40} />

			<!-- Total Win (highlighted) -->
			<Rectangle anchor={0.5} backgroundColor={0x334155} width={340} height={30} borderRadius={6} y={75} />
			<Text anchor={{ x: 0, y: 0.5 }} text={i18nDerived.replayTotalWin()} style={infoLabelStyle} x={-155} y={75} />
			<Text anchor={{ x: 1, y: 0.5 }} text={totalWin} style={infoHighlightStyle} x={155} y={75} />

			<!-- Start Replay button -->
			<Container
				y={140}
				eventMode="static"
				cursor="pointer"
				onpointerup={onStartReplay}
			>
				<Rectangle anchor={0.5} backgroundColor={0xeab308} width={300} height={56} borderRadius={12} />
				<Text anchor={0.5} text={i18nDerived.replayStartButton()} style={startButtonStyle} />
			</Container>

			<!-- Disclaimer -->
			<Text anchor={0.5} text={i18nDerived.replayDisclaimer()} style={disclaimerStyle} y={200} />
		</Container>
	{/if}
</UiFadeContainer>
