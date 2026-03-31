const DEFAULT_BET_MODE_META = {
	BASE: {
		mode: 'BASE',
		costMultiplier: 1.0,
		type: 'default',
		parent: '',
		children: '',
		assets: {
			icon: '',
			dialogImage: '',
			dialogVolatility: '',
			volatility: '',
			button: '',
		},
		text: {
			title: '',
			dialog: '',
			button: '',
			betAmountLabel: '',
			tickerIdle: '',
			tickerSpin: '',
			bannerText: '',
		},
		maxWin: 8888,
	},
	BONUS: {
		mode: 'BONUS',
		costMultiplier: 1,
		type: 'buy',
		parent: '',
		children: '',
		assets: {
			icon: '',
			dialogImage: '',
			dialogVolatility: '',
			volatility: '',
			button: '',
		},
		text: {
			title: 'GET BONUS',
			dialog:
				'Enter FREE SPINS for a multiplied play amount. Game-specific costMultiplier and details are set per game.',
			description: 'Enter FREE SPINS with enhanced features.',
			button: 'PLAY',
			tickerIdle: '',
			tickerSpin: 'FREE SPINS ACTIVATED',
			bannerText: '',
		},
	},
};

const DEFAULT_GAME_RULE_META = {
	payTable: [
		{
			containers: [
				{
					title: 'WILD SYMBOL',
					text: 'The Wild symbol substitutes all other symbols except Scatter.',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: 'FREE SPINS',
					text: 'Scatter Symbols are on all reels. If at least 3 Scatters land in a spin sequence, FREE SPINS is triggered. 3 Scatters award 8 FREE SPINS. 4 Scatters award 12 FREE SPINS. 5 Scatters award 16 FREE SPINS. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: 'FREE SPINS RETRIGGER',
					text: 'During FREE SPINS, Scatter Symbols are on all reels. If at least 3 Scatters land in a spin sequence, additional FREE SPINS rounds are triggered. 3 Scatters award 4 additional FREE SPINS. 4 Scatters award 6 additional FREE SPINS. 5 Scatters award 8 additional FREE SPINS. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 2,
					column: 0,
				},
			],
			rows: 3,
			columns: 1,
			title: 'PAYTABLE',
		},
		{
			containers: [
				{
					title: '',
					text: '5	|	10x\n4	|	5x\n3	|	2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: '',
					text: '5	|	5x\n4	|	2x\n3	|	1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 1,
				},
				{
					title: '',
					text: '5	|	5x\n4	|	2x\n3	|	1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 2,
				},
				{
					title: '',
					text: '5	|	3x\n4	|	1x\n3	|	0.5x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: '',
					text: '5	|	3x\n4	|	1x\n3	|	0.5x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 1,
				},
				{
					title: '',
					text: '5	|	2x\n4	|	0.8x\n3	|	0.4x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 0,
				},
				{
					title: '',
					text: '5	|	2x\n4	|	0.8x\n3	|	0.4x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 1,
				},
				{
					title: '',
					text: '5	|	1.5x\n4	|	0.5x\n3	|	0.2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 2,
				},
				{
					title: '',
					text: '5	|	1.5x\n4	|	0.5x\n3	|	0.2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 0,
				},
				{
					title: '',
					text: '5	|	1x\n4	|	0.3x\n3	|	0.1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 1,
				},
				{
					title: '',
					text: '5	|	1x\n4	|	0.3x\n3	|	0.1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 2,
				},
			],
			rows: 5,
			columns: 3,
			title: 'SYMBOLS',
		},
		{
			containers: [
				{
					title: '',
					text: 'All symbols pay from left to right. Starting from the left most reel. Only symbols on adjacent reels will be a valid win way. This does not apply to Scatter. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/winWays.be45a8a4.png',
					imagePosition: 'top',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'WIN WAYS',
		},
	],
	gameRules: [
		{
			containers: [
				{
					title: '',
					text: 'The normal mode of this game has a theoretical expected return of 97.0%.\n\nThe player also has the option to select an ANTE BET mode. This costs 1.25x the underlying bet. The ANTE BET mode has a theoretical expected return of 97.0%. The ANTE BET doubles the chance of FREE SPINS.\n\nThe player also has the option to buy FREE SPINS. This costs 100x the underlying bet. The FREE SPINS buy mode has a theoretical expected return of 97.0%. \n\nThe player has the option to buy a SUPER SPIN. This costs 25x the underlying bet. The SUPER SPIN buy mode has a theoretical expected return of 97.0%. In SUPER SPIN one spin is initially awarded. On each spin stacked Wild Symbols are on Reel Strips\n\n The maximum win in each Bet Mode is 5000x the underlining bet.',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/rtp97.d2febd7d.svg',
					imagePosition: 'top',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'BET MODES',
		},
		{
			containers: [
				{
					title: '',
					text: 'Malfunction voids all pays and plays. A consistent internet connection is required. In the event of a disconnection, reload the game to finish any uncompleted bets. The theoretical expected return is calculated over many spins. Movement of reels are not representative of any physical device, and is for illustrative purposes only. TM and \u00a9 2023 Twist Gaming.',
					image: '',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'LEGAL NOTICE',
		},
		{
			containers: [
				{
					title: '',
					text: 'SPIN BUTTON | Initiates the Betting Round.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleSpin.daacc43a.webp',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: '',
					text: 'STOP BUTTON | Stops the current Spin.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleStop.30db74c5.webp',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: '',
					text: 'INFORMATION | Provides Game Information.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 2,
					column: 0,
				},
				{
					title: '',
					text: 'SETTINGS | Adjust Game Settings.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 4,
					column: 0,
				},
				{
					title: '',
					text: 'PAY TABLE | View the Paytable to see Symbol Values.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 6,
					column: 0,
				},
				{
					title: '',
					text: 'AUTO SPIN | Open the Auto Spin pop-up menu.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleAutoSpin.d542a3b0.webp',
					imagePosition: 'left',
					row: 7,
					column: 0,
				},

				{
					title: '',
					text: 'TURBO | Activate Turbo Mode.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleTurbo.a0fcfd04.webp',
					imagePosition: 'left',
					row: 9,
					column: 0,
				},
				{
					title: '',
					text: 'MENU | Expands the Sidebar Menu for more Options.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 10,
					column: 0,
				},
				{
					title: '',
					text: 'CLOSE | Exit the pop-up menu.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 11,
					column: 0,
				},
				{
					title: '',
					text: 'SOUND | Mute or Unmute Game Audio.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 12,
					column: 0,
				},
				{
					title: '',
					text: 'INCREASE | Increase your Bet Amount',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 13,
					column: 0,
				},
				{
					title: '',
					text: 'DECREASE | Decrease your Bet Amount',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 14,
					column: 0,
				},
			],
			rows: 16,
			columns: 1,
			title: 'USER INTERFACE GUIDE',
		},
	],
	splashScreen: [],
};

export { DEFAULT_BET_MODE_META, DEFAULT_GAME_RULE_META };
