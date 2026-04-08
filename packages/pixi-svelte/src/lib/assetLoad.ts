import * as SPINE_PIXI from '@esotericsoftware/spine-pixi-v8';
import type { RawType, RawAsset, RawSpine, RawSprites, SpineSrc, RawAudio } from './types';

const PROCESS_METHOD_MAP = {
	spine: ({ key, rawAsset, src }: { key: string; rawAsset: RawSpine; src: SpineSrc }) => {
		const atlasAsset = rawAsset[src.atlas] as SPINE_PIXI.TextureAtlas;
		const skeletonAsset = rawAsset[src.skeleton] as Uint8Array;
		// DEBUG: detailed spine processing diagnostics
		console.log(`[assetLoad] key="${key}" atlasAsset:`, atlasAsset?.constructor?.name ?? 'UNDEFINED',
			'skeletonAsset:', skeletonAsset?.constructor?.name ?? typeof skeletonAsset ?? 'UNDEFINED',
			'isBinary:', skeletonAsset instanceof Uint8Array);
		if (!atlasAsset) {
			console.error(`[assetLoad] FAIL key="${key}": atlas is undefined. src.atlas=${src.atlas?.toString().split('/').pop()}`);
			return { [key]: undefined };
		}
		if (!skeletonAsset) {
			console.error(`[assetLoad] FAIL key="${key}": skeleton is undefined. src.skeleton=${src.skeleton?.toString().split('/').pop()}`);
			return { [key]: undefined };
		}
		const attachmentLoader = new SPINE_PIXI.AtlasAttachmentLoader(atlasAsset);
		const parser =
			skeletonAsset instanceof Uint8Array
				? new SPINE_PIXI.SkeletonBinary(attachmentLoader)
				: new SPINE_PIXI.SkeletonJson(attachmentLoader);
		const scale = src?.scale ?? 1;
		parser.scale = scale;
		try {
			const skeletonData = parser.readSkeletonData(skeletonAsset);
			console.log(`[assetLoad] OK key="${key}" bones:${skeletonData.bones?.length} anims:${skeletonData.animations?.length}`);
			return { [key]: skeletonData };
		} catch (err) {
			console.error(`[assetLoad] readSkeletonData THREW for key="${key}":`, err);
			return { [key]: undefined };
		}
	},
	sprite: ({ key, rawAsset }: { key: string; rawAsset: RawSprites }) => ({ [key]: rawAsset }),
	sprites: ({ rawAsset }: { rawAsset: RawSprites }) => rawAsset.textures,
	spriteSheet: ({ key, rawAsset }: { key: string; rawAsset: RawSprites }) => ({
		[key]: Object.values(rawAsset.textures),
	}),
	audio: ({ key, rawAsset }: { key: string; rawAsset: RawAudio }) => {
		return { [key]: rawAsset };
	},
} as const;

export const getProcessed = ({
	key,
	type,
	rawAsset,
	src,
}: {
	key: string;
	type: RawType;
	rawAsset: RawAsset;
	src: string | SpineSrc;
}) => {
	if (type === 'font') return; // No need to process raw font data and add it to the loaded assets.
	const processMethod = PROCESS_METHOD_MAP[type];
	if (!processMethod)
		throw Error('No asset process method found, please check the type of the asset.');
	// @ts-expect-error
	return processMethod({ key, rawAsset, src });
};
