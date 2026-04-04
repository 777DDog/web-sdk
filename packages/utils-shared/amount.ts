import { BOOK_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
import { stateBet } from 'state-shared';

interface CurrencyFormat {
	symbol: string;
	position: 'prefix' | 'suffix';
	decimals: number;
}

// Stake official currency format table (stake-docs/04-approval-guidelines.md §4)
// Thousands separator: comma. Decimal separator: period. Fixed format regardless of locale.
const CURRENCY_FORMAT_MAP: Record<string, CurrencyFormat> = {
	USD: { symbol: '$', position: 'prefix', decimals: 2 },
	CAD: { symbol: 'CA$', position: 'prefix', decimals: 2 },
	JPY: { symbol: '¥', position: 'prefix', decimals: 0 },
	EUR: { symbol: '€', position: 'prefix', decimals: 2 },
	RUB: { symbol: '₽', position: 'prefix', decimals: 2 },
	CNY: { symbol: 'CN¥', position: 'prefix', decimals: 2 },
	PHP: { symbol: '₱', position: 'prefix', decimals: 2 },
	INR: { symbol: '₹', position: 'prefix', decimals: 2 },
	IDR: { symbol: 'Rp', position: 'prefix', decimals: 0 },
	KRW: { symbol: '₩', position: 'prefix', decimals: 0 },
	BRL: { symbol: 'R$', position: 'prefix', decimals: 2 },
	MXN: { symbol: 'MX$', position: 'prefix', decimals: 2 },
	DKK: { symbol: 'KR', position: 'suffix', decimals: 2 },
	PLN: { symbol: 'zł', position: 'suffix', decimals: 2 },
	VND: { symbol: '₫', position: 'suffix', decimals: 0 },
	TRY: { symbol: '₺', position: 'prefix', decimals: 2 },
	CLP: { symbol: 'CLP', position: 'suffix', decimals: 0 },
	ARS: { symbol: 'ARS', position: 'suffix', decimals: 2 },
	PEN: { symbol: 'S/', position: 'prefix', decimals: 2 },
	NGN: { symbol: '₦', position: 'prefix', decimals: 2 },
	SAR: { symbol: 'SAR', position: 'suffix', decimals: 2 },
	ILS: { symbol: 'ILS', position: 'suffix', decimals: 2 },
	AED: { symbol: 'AED', position: 'suffix', decimals: 2 },
	TWD: { symbol: 'NT$', position: 'prefix', decimals: 2 },
	NOK: { symbol: 'kr', position: 'prefix', decimals: 2 },
	KWD: { symbol: 'KD', position: 'prefix', decimals: 2 },
	JOD: { symbol: 'JD', position: 'prefix', decimals: 2 },
	CRC: { symbol: '₡', position: 'prefix', decimals: 2 },
	TND: { symbol: 'TND', position: 'suffix', decimals: 2 },
	SGD: { symbol: 'SG$', position: 'prefix', decimals: 2 },
	MYR: { symbol: 'RM', position: 'prefix', decimals: 2 },
	OMR: { symbol: 'OMR', position: 'suffix', decimals: 2 },
	QAR: { symbol: 'QAR', position: 'suffix', decimals: 2 },
	BHD: { symbol: 'BD', position: 'prefix', decimals: 2 },
	XGC: { symbol: 'GC', position: 'suffix', decimals: 2 },
	XSC: { symbol: 'SC', position: 'suffix', decimals: 2 },
};

// bookEventAmount: is the amount or win numbers in the events of books, e.g. the amount in setTotalWin bookEvent
// {
// 	"index": 3,
// 	"type": "setTotalWin",
// 	"amount": 100
// },
// if betting on $1,   100 bookEventAmount equals to $1.    betAmountMultiplier is (100 / BOOK_AMOUNT_MULTIPLIER =) 1
// if betting on $1,    50 bookEventAmount equals to $0.5.  betAmountMultiplier is ( 50 / BOOK_AMOUNT_MULTIPLIER =) 0.5
// if betting on $0.5, 100 bookEventAmount equals to $0.5.  betAmountMultiplier is (100 / BOOK_AMOUNT_MULTIPLIER =) 1
// if betting on $0.5,  50 bookEventAmount equals to $0.25. betAmountMultiplier is ( 50 / BOOK_AMOUNT_MULTIPLIER =) 0.5

export const bookEventAmountToBetAmountMultiplier = (bookEventAmount: number) =>
	bookEventAmount / BOOK_AMOUNT_MULTIPLIER;

export const bookEventAmountToNormalisedAmount = (bookEventAmount: number) => {
	const betAmountMultiplier = bookEventAmountToBetAmountMultiplier(bookEventAmount);
	return stateBet.wageredBetAmount * betAmountMultiplier;
};

export const numberToFloat = (value: number) => Number.parseFloat(`${value}`);

export const getCurrencyDecimals = (): number => {
	const format = CURRENCY_FORMAT_MAP[stateBet.currency];
	return format ? format.decimals : 2;
};

const formatNumber = (value: number, decimals: number): string =>
	numberToFloat(value).toLocaleString('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});

export const numberToCurrencyString = (value: number) => {
	const format = CURRENCY_FORMAT_MAP[stateBet.currency];

	if (!format) {
		// Unknown currency: fallback to currency code as suffix with 2 decimals
		return `${formatNumber(value, 2)} ${stateBet.currency}`;
	}

	const formatted = formatNumber(value, format.decimals);
	return format.position === 'prefix'
		? `${format.symbol}${formatted}`
		: `${formatted} ${format.symbol}`;
};

export const bookEventAmountToCurrencyString = (bookEventAmount: number) => {
	const normalisedAmount = bookEventAmountToNormalisedAmount(bookEventAmount);
	return numberToCurrencyString(normalisedAmount);
};
