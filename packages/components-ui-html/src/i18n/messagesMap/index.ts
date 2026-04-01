import en from './en';
import zh from './zh';
import ja from './ja';
import ko from './ko';
import pt from './pt';
import es from './es';
import de from './de';

const messagesMap = {
	en,
	zh,
	ja,
	ko,
	pt,
	es,
	de,
	// Unsupported languages fall back to English
	ar: en,
	fr: en,
	id: en,
	pl: en,
	ru: en,
	tr: en,
	vi: en,
	fi: en,
	hi: en,
};

export default messagesMap;
