import { i18n, type Messages } from '@lingui/core';
import { type Language } from './stateUrl.svelte';

// Set message compiler to suppress "Uncompiled message detected" warnings.
// Our catalogs use plain strings (no ICU), so an identity compiler suffices.
// @ts-ignore — _messageCompiler is internal but stable API
i18n._messageCompiler = (message: string) => message;

export const stateI18n = $state({
	i18n
});

export const stateI18nDerived = {
	init: (lang: Language, messages: Messages) => {
		stateI18n.i18n.load(lang, messages as Messages);
		stateI18n.i18n.activate(lang);
	},
	translate: (value: string) => stateI18n.i18n._(stateI18n.i18n.t(value)),
};