// Currencies for the transaction calculators (Cross-border payments and SMEs heroes).
// perUSD: units of the currency for 1 US dollar. These are INDICATIVE rates for the
// marketing site only; the dashboard shows the live rate before a payment is confirmed.
// Update them here and rebuild (or push: Vercel rebuilds on every push).
// send: can be picked under "You send" (wallet balances); receive: payout currencies.

export const fx = [
  { code: 'NGN', name: 'Nigerian naira',     country: 'NG', symbol: '₦',    decimals: 2, perUSD: 1500,  send: true,  receive: true },
  { code: 'USD', name: 'US dollar',          country: 'US', symbol: '$',    decimals: 2, perUSD: 1,     send: true,  receive: true },
  { code: 'KES', name: 'Kenyan shilling',    country: 'KE', symbol: 'KSh ', decimals: 2, perUSD: 129,   send: true,  receive: true },
  { code: 'CNY', name: 'Chinese yuan',       country: 'CN', symbol: '¥',    decimals: 2, perUSD: 7.2,   send: true,  receive: true },
  { code: 'GBP', name: 'British pound',      country: 'GB', symbol: '£',    decimals: 2, perUSD: 0.79,  send: false, receive: true },
  { code: 'CAD', name: 'Canadian dollar',    country: 'CA', symbol: 'CA$',  decimals: 2, perUSD: 1.39,  send: false, receive: true },
  { code: 'AUD', name: 'Australian dollar',  country: 'AU', symbol: 'A$',   decimals: 2, perUSD: 1.53,  send: false, receive: true },
  { code: 'VND', name: 'Vietnamese dong',    country: 'VN', symbol: '₫',    decimals: 0, perUSD: 25400, send: false, receive: true },
  { code: 'UGX', name: 'Ugandan shilling',   country: 'UG', symbol: 'USh ', decimals: 0, perUSD: 3700,  send: false, receive: true },
  { code: 'RWF', name: 'Rwandan franc',      country: 'RW', symbol: 'FRw ', decimals: 0, perUSD: 1420,  send: false, receive: true },
];
