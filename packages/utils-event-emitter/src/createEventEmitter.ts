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

	const BROADCAST_ASYNC_TIMEOUT_MS = 10_000; // 10s safety net for stuck subscribers

	const broadcastAsync = (emitterEvent: TEmitterEvent) => {
		console.log(`[broadcastAsync] START: ${emitterEvent.type}`);
		const getPromises = () =>
			Array.from(subscriptions).map((handler, i) => {
				const p = handler(emitterEvent);
				if (p?.then) p.then(() => console.log(`[broadcastAsync] ${emitterEvent.type} subscriber ${i} resolved`));
				return p;
			});
		const allP = Promise.all(getPromises());
		allP.then(() => console.log(`[broadcastAsync] DONE: ${emitterEvent.type}`));
		return Promise.race([
			allP,
			new Promise((resolve) => setTimeout(resolve, BROADCAST_ASYNC_TIMEOUT_MS)).then(() =>
				console.log(`[broadcastAsync] TIMEOUT: ${emitterEvent.type}`),
			),
		]);
	};

	const eventEmitter = {
		subscribeOnMount,
		broadcast,
		broadcastAsync,
	};

	return { eventEmitter };
}
