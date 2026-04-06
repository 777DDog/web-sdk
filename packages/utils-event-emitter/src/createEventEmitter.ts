import { onMount } from 'svelte';

export type EmitterEventBase = {
	type: string;
};

export function createEventEmitter<TEmitterEvent extends EmitterEventBase>() {
	type EmitterEventType = TEmitterEvent['type'];
	type EmitterEventOfType<T> = Extract<TEmitterEvent, { type: T }>;
	type EmitterEventHandler = (emitterEvent: TEmitterEvent) => any;
	type EmitterEventHandlerOfType<T> = (emitterEvent: EmitterEventOfType<T>) => any;
	type EmitterEventHandlerMap = { [T in EmitterEventType]: EmitterEventHandlerOfType<T> };

	const subscriptions = new Set<EmitterEventHandler>();

	const subscribeHandler = (emitterEventHandler: EmitterEventHandler) => {
		subscriptions.add(emitterEventHandler);
		return () => subscriptions.delete(emitterEventHandler);
	};

	const subscribeHandlerMap = (emitterEventHandlerMap: Partial<EmitterEventHandlerMap>) => {
		return subscribeHandler((emitterEvent) => {
			const emitterEventHandler = emitterEventHandlerMap?.[emitterEvent.type as EmitterEventType];

			if (emitterEventHandler) {
				return emitterEventHandler(emitterEvent as EmitterEventOfType<EmitterEventType>);
			}
		});
	};

	const subscribeOnMount = (emitterEventHandlerMap: Partial<EmitterEventHandlerMap>) => {
		onMount(() => subscribeHandlerMap(emitterEventHandlerMap));
	};

	const broadcast = (emitterEvent: TEmitterEvent) => {
		subscriptions.forEach((emitterEventHandler) => {
			emitterEventHandler(emitterEvent);
		});
	};

	const BROADCAST_ASYNC_TIMEOUT_MS = 3_000; // 3s safety net for stuck subscribers

	const broadcastAsync = (emitterEvent: TEmitterEvent) => {
		let timeoutId: ReturnType<typeof setTimeout>;
		const getPromises = () =>
			Array.from(subscriptions).map((handler) => handler(emitterEvent));
		const allP = Promise.all(getPromises());
		allP.then(() => clearTimeout(timeoutId));
		return Promise.race([
			allP,
			new Promise((resolve) => {
				timeoutId = setTimeout(() => resolve(undefined), BROADCAST_ASYNC_TIMEOUT_MS);
			}),
		]);
	};

	const eventEmitter = {
		subscribeOnMount,
		broadcast,
		broadcastAsync,
	};

	return { eventEmitter };
}
