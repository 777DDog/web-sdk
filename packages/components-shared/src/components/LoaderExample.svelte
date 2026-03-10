<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import teamLogo from '../assets/team-logo.png';

	const DISPLAY_DURATION = 2500;

	let visible = $state(true);

	onMount(() => {
		const timer = setTimeout(() => {
			visible = false;
		}, DISPLAY_DURATION);
		return () => clearTimeout(timer);
	});
</script>

{#if visible}
	<div class="loader-overlay" transition:fade={{ duration: 400 }}>
		<div class="loader-content">
			<img
				class="team-logo"
				src={teamLogo}
				alt="Loading"
				draggable="false"
			/>
			<div class="loading-dots">
				<span class="dot"></span>
				<span class="dot"></span>
				<span class="dot"></span>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.loader-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background-color: #0a0a0a;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.loader-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	.team-logo {
		width: 120px;
		height: auto;
		animation: breathe 2s ease-in-out infinite;
		filter: drop-shadow(0 0 20px rgba(255, 180, 130, 0.3));
	}

	@keyframes breathe {
		0%,
		100% {
			transform: scale(1);
			filter: drop-shadow(0 0 20px rgba(255, 180, 130, 0.3));
		}
		50% {
			transform: scale(1.06);
			filter: drop-shadow(0 0 30px rgba(255, 180, 130, 0.5));
		}
	}

	.loading-dots {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.7);
		animation: dotWave 1.4s ease-in-out infinite;

		&:nth-child(2) {
			animation-delay: 0.2s;
		}

		&:nth-child(3) {
			animation-delay: 0.4s;
		}
	}

	@keyframes dotWave {
		0%,
		80%,
		100% {
			transform: scale(0.6);
			opacity: 0.4;
		}
		40% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
