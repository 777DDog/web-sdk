import type { Howl } from 'howler';

import type { PlayOptions, GetSound, GetSoundMap } from './types';

export function createPlayMusic<TSoundName extends string>(options: {
	howl: Howl;
	newSound: (value: TSoundName) => GetSound<TSoundName>;
	getSoundMap: () => GetSoundMap<TSoundName>;
	initSoundVolume: (soundName: TSoundName) => void;
}) {
	type Sound = GetSound<TSoundName>;

	const pauseAllMusic = () => {
		(Object.values(options.getSoundMap()) as Sound[]).forEach((existingSound) => {
			options.howl.pause(existingSound.soundId);
			options.getSoundMap()[existingSound.soundName] = {
				...existingSound,
				soundState: 'paused',
			};
		});
	};

	const newMusic = (sound: Sound) => {
		pauseAllMusic();
		const soundId = options.howl.play(sound.soundName);
		options.getSoundMap()[sound.soundName] = {
			...sound,
			soundId,
			soundState: 'playing',
		};
		options.initSoundVolume(sound.soundName);
	};

	const resumeMusic = (sound: Sound) => {
		pauseAllMusic();
		options.howl.play(sound.soundId);
		options.getSoundMap()[sound.soundName] = {
			...sound,
			soundState: 'playing',
		};
	};

	const soundPlayMap = {
		new: (sound: Sound) => newMusic(sound),
		paused: (sound: Sound) => resumeMusic(sound),
		playing: (_: Sound) => {
			// Do nothing
		},
	};

	const play = (playOptions: PlayOptions<TSoundName>) => {
		const existingSound = options.getSoundMap()[playOptions.name];
		const sound = existingSound ?? options.newSound(playOptions.name);
		// forcePlay: callers who need the track to (re)start from the beginning —
		// e.g. a celebration BGM that played once already and is now paused.
		// Without forcePlay, soundState='paused' would resume mid-track.
		if (playOptions.forcePlay && sound.soundState !== 'new') {
			options.howl.stop(sound.soundId);
			newMusic(options.newSound(playOptions.name));
			return;
		}
		soundPlayMap[sound.soundState](sound);
	};

	return {
		play,
	};
}
