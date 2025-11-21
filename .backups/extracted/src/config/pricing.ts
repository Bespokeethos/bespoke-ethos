export const PRICING = {
  currency: "$",
  flowstack: {
    setup: 399,
    monthly: 59.99,
  },
  chatbots: {
    rangeMin: 49,
    rangeMax: 199,
  },
  redbridging: {
    standaloneLow: 49,
    standaloneHigh: 99,
  },
  scale: {
    monthly: 199,
  },
} as const;

export function formatMoney(amount: number, currency = PRICING.currency) {
  const withCents = Math.round(amount * 100) % 100 !== 0;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0,
  })
    .format(amount);
  if (currency === "$") return formatted;
  return formatted.startsWith("$") ? currency + formatted.slice(1) : formatted;
}

export function planSummary(setup: number, monthly: number) {
  return `From ${formatMoney(setup)} setup + ${formatMoney(monthly)}/mo`;
}

export function planFromMonthly(monthly: number) {
  return `From ${formatMoney(monthly)}/mo`;
}
