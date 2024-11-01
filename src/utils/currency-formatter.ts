import currencyFormatter from "currency-formatter";

type CurrencyOptions = {
  locale?: string;
};

export default (
  value: number | undefined,
  currency: string,
  options: CurrencyOptions = {}
): string | number => {
  if (value) {
    return currencyFormatter.format(value, {
      code: currency,
      ...options,
    });
  }
  return 0;
};
