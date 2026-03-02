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

	// Replay info derived values
	const baseBetValue = $derived(numberToCurrencyString(stateBet.betAmount));
	const costMultiplier = $derived(stateBetDerived.activeBetMode()?.costMultiplier ?? 1);
	const payoutMultiplier = $derived((stateBet.betToResume as any)?.payoutMultiplier ?? 0);

	const infoStyle = {
		fontFamily: 'proxima-nova',
		fontSize: 20,
		fill: WHITE,
	} as const;

	const infoLabelStyle = {
		fontFamily: 'proxima-nova',
		fontSize: 20,
		fill: 0xaaaaaa,
	} as const;

	const replayButtonStyle = {
		fontFamily: 'proxima-nova',
		fontSize: 32,
		fill: WHITE,
	} as const;

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

	<!-- Replay Info: Base Bet / Cost Multiplier / Payout Multiplier -->
	<MainContainer standard>
		<Container x={20} y={80}>
			<Text anchor={{ x: 0, y: 0 }} text={i18nDerived.replayBaseBet()} style={infoLabelStyle} />
			<Text anchor={{ x: 0, y: 0 }} text={baseBetValue} style={infoStyle} x={220} />

			<Text anchor={{ x: 0, y: 0 }} text={i18nDerived.replayCostMultiplier()} style={infoLabelStyle} y={30} />
			<Text anchor={{ x: 0, y: 0 }} text={`${costMultiplier}×`} style={infoStyle} x={220} y={30} />

			<Text anchor={{ x: 0, y: 0 }} text={i18nDerived.replayPayoutMultiplier()} style={infoLabelStyle} y={60} />
			<Text anchor={{ x: 0, y: 0 }} text={`${payoutMultiplier}×`} style={infoStyle} x={220} y={60} />
		</Container>
	</MainContainer>

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
			width={context.stateLayoutDerived.canvasSizes().width}
			height={context.stateLayoutDerived.canvasSizes().height}
			x={context.stateLayoutDerived.canvasSizes().width * 0.5}
			y={context.stateLayoutDerived.canvasSizes().height * 0.5}
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
</UiFadeContainer>
