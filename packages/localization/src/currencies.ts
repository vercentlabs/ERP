export const supportedCurrencies = ["INR", "USD", "EUR", "GBP", "AED"] as const;

export function defaultCurrencyForCountry(countryCode: string) {
  return countryCode.toUpperCase() === "IN" ? "INR" : "USD";
}
