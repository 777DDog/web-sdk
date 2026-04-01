<script lang="ts">
	import { Container, Text, Graphics } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';

	import UiSprite from './UiSprite.svelte';
	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
	import { i18nDerived } from '../i18n/i18nDerived';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<Button {...props} {sizes} {onpress} {disabled}>
			{#snippet children({ center, hovered })}
				<Container {...center}>
					<UiSprite
						key="bet"
						width={sizes.width}
						height={sizes.height}
						anchor={0.5}
						{...disabled || ['spin_disabled', 'stop_disabled'].includes(key)
							? {
									backgroundColor: 0xaaaaaa,
								}
							: {}}
					/>
					{#if key.startsWith('stop')}
						<Graphics
							draw={(g) => {
								const s = UI_BASE_FONT_SIZE * 0.8;
								g.rect(-s, -s, s * 2, s * 2);
								g.fill({ color: 0xffffff });
							}}
						/>
					{:else}
						<Text
							anchor={0.5}
							text={i18nDerived.bet()}
							style={{
								align: 'center',
								wordWrap: true,
								wordWrapWidth: 200,
								fontFamily: 'Source Sans 3',
								fontWeight: '600',
								fontSize: UI_BASE_FONT_SIZE * 0.9,
								fill: 0xffffff,
							}}
						/>
					{/if}
				</Container>
			{/snippet}
		</Button>
	{/snippet}
</ButtonBetProvider>
