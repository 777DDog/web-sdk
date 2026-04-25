import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
import { rgsFetcher } from 'rgs-fetcher';

export * from './types';

export const requestAuthenticate = async (options: {
	sessionID: string;
	rgsUrl: string;
	language: string;
}) => {
	const data = await rgsFetcher.post({
		rgsUrl: options.rgsUrl,
		url: '/wallet/authenticate',
		variables: {
			sessionID: options.sessionID,
			language: options.language,
		},
	});

	return data;
};

export const requestEndRound = async (options: {
	sessionID: string;
	rgsUrl: string;
}) => {
	const __payload = { sessionID: options.sessionID };
	console.log('[T93] requestEndRound REQUEST', { url: '/wallet/end-round', payload: __payload });
	try {
		const data = await rgsFetcher.post({
			rgsUrl: options.rgsUrl,
			url: '/wallet/end-round',
			variables: __payload,
		});
		console.log('[T93] requestEndRound RESPONSE OK', data);
		return data;
	} catch (e) {
		console.log('[T93] requestEndRound ERROR', e);
		throw e;
	}
};

export const requestEndEvent = async (options: {
	sessionID: string;
	eventIndex: number;
	rgsUrl: string;
}) => {
	const data = await rgsFetcher.post({
		rgsUrl: options.rgsUrl,
		url: '/bet/event',
		variables: {
			sessionID: options.sessionID,
			event: `${options.eventIndex}`,
		},
	});

	return data;
};

export const requestBet = async (options: {
	sessionID: string;
	currency: string;
	amount: number;
	mode: string;
	rgsUrl: string;
}) => {
	const __payload = {
		mode: options.mode,
		currency: options.currency,
		sessionID: options.sessionID,
		amount: options.amount * API_AMOUNT_MULTIPLIER,
	};
	console.log('[T93] requestBet REQUEST', {
		url: '/wallet/play',
		payload: __payload,
		// raw amount before multiplier — useful for VND vs USD vs JPY comparison
		rawAmount: options.amount,
		API_AMOUNT_MULTIPLIER,
	});
	try {
		const data = await rgsFetcher.post({
			rgsUrl: options.rgsUrl,
			url: '/wallet/play',
			variables: __payload,
		});
		console.log('[T93] requestBet RESPONSE OK', data);
		return data;
	} catch (e) {
		console.log('[T93] requestBet ERROR', e);
		throw e;
	}
};

export const requestReplay = async (options: {
	game: string;
	version: string;
	mode: string;
	event: string;
	rgsUrl: string;
	lang: string;
}) => {
	const data = await rgsFetcher.get({
		rgsUrl: options.rgsUrl,
		// @ts-ignore TODO: update the schema.ts
		url: `/bet/replay/${options.game}/${options.version}/${options.mode}/${options.event}?lang=${options.lang}`,
	});

	return data;
}