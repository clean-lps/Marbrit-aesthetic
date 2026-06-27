export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "es-ES",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
