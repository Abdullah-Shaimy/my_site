export interface CurrencyItem {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
  popular?: boolean;
}

export const POPULAR_CURRENCIES: CurrencyItem[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", popular: true },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", popular: true },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", popular: true },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", popular: true },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", popular: true },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", popular: true },
  { code: "AED", name: "UAE Dirham", symbol: "AED", flag: "🇦🇪", popular: true },
  { code: "SAR", name: "Saudi Riyal", symbol: "SAR", flag: "🇸🇦", popular: true },
  { code: "QAR", name: "Qatari Riyal", symbol: "QAR", flag: "🇶🇦", popular: true },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KWD", flag: "🇰🇼", popular: true },
  { code: "BHD", name: "Bahraini Dinar", symbol: "BHD", flag: "🇧🇭", popular: true },
  { code: "OMR", name: "Omani Rial", symbol: "OMR", flag: "🇴🇲", popular: true },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", popular: true },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", popular: true },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭", popular: true },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿", popular: true },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", popular: true },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾", popular: true },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs", flag: "🇱🇰", popular: true },
];

export const OTHER_CURRENCIES: CurrencyItem[] = [
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs", flag: "🇵🇰" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", flag: "🇪🇬" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", flag: "🇮🇱" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", flag: "🇷🇴" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", flag: "🇨🇱" },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵", flag: "🇬🇭" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$", flag: "🇹🇼" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "MAD", flag: "🇲🇦" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JOD", flag: "🇯🇴" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", flag: "🇰🇿" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", flag: "🇺🇦" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "Rs", flag: "🇳🇵" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", flag: "🇧🇬" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/", flag: "🇵🇪" },
];

export const ALL_SUPPORTED_CURRENCIES: CurrencyItem[] = [
  ...POPULAR_CURRENCIES,
  ...OTHER_CURRENCIES,
];

// Reliable default exchange rates (1 unit of Currency = X LKR)
// Used immediately as initial state and offline/fallback safety
export const DEFAULT_FALLBACK_TO_LKR_RATES: Record<string, number> = {
  LKR: 1,
  USD: 332.17,
  EUR: 370.75,
  GBP: 443.39,
  AUD: 233.45,
  CAD: 237.45,
  SGD: 259.33,
  AED: 90.45,
  SAR: 88.58,
  QAR: 91.22,
  KWD: 1083.50,
  BHD: 881.08,
  OMR: 863.85,
  INR: 3.49,
  JPY: 2.10,
  CHF: 398.20,
  NZD: 210.15,
  CNY: 46.52,
  MYR: 76.85,
  HKD: 42.60,
  THB: 9.85,
  KRW: 0.24,
  SEK: 32.10,
  NOK: 31.40,
  DKK: 49.70,
  PLN: 87.20,
  TRY: 9.60,
  ZAR: 18.80,
  BRL: 58.90,
  MXN: 17.50,
  IDR: 0.021,
  PHP: 5.80,
  PKR: 1.19,
  BDT: 2.76,
  VND: 0.013,
  EGP: 6.85,
  ILS: 89.50,
  CZK: 14.80,
  HUF: 0.92,
  RON: 74.50,
  CLP: 0.35,
  COP: 0.078,
  NGN: 0.22,
  KES: 2.58,
  GHS: 21.50,
  ARS: 0.34,
  TWD: 10.40,
  MAD: 34.20,
  JOD: 468.50,
  KZT: 0.68,
  UAH: 8.05,
  NPR: 2.18,
  BGN: 189.50,
  PEN: 89.20,
};

export const GATEWAY_FEE_PERCENT = 3.3; // 3.3% transaction fee

export function getCurrencyInfo(code: string): CurrencyItem {
  const found = ALL_SUPPORTED_CURRENCIES.find((c) => c.code === code);
  if (found) return found;
  return {
    code,
    name: code,
    symbol: code,
  };
}

export interface PaymentCalculation {
  inputAmount: number;
  inputCurrency: string;
  currencySymbol: string;
  rateToLkr: number;
  baseInLkr: number;
  feePercent: number;
  feeInLkr: number;
  totalPayableLkr: number;
  isLkr: boolean;
}

export function calculatePaymentDetails(
  amountStr: string,
  currencyCode: string,
  ratesToLkr: Record<string, number> = DEFAULT_FALLBACK_TO_LKR_RATES
): PaymentCalculation {
  const num = parseFloat(amountStr);
  const inputAmount = isNaN(num) || num <= 0 ? 0 : num;
  const isLkr = currencyCode === "LKR";
  const rateToLkr = isLkr ? 1 : ratesToLkr[currencyCode] || DEFAULT_FALLBACK_TO_LKR_RATES[currencyCode] || 1;
  const currInfo = getCurrencyInfo(currencyCode);

  const baseInLkr = inputAmount * rateToLkr;
  const feeInLkr = baseInLkr * (GATEWAY_FEE_PERCENT / 100);
  const totalPayableLkr = baseInLkr + feeInLkr;

  return {
    inputAmount,
    inputCurrency: currencyCode,
    currencySymbol: currInfo.symbol,
    rateToLkr,
    baseInLkr,
    feePercent: GATEWAY_FEE_PERCENT,
    feeInLkr,
    totalPayableLkr,
    isLkr,
  };
}
