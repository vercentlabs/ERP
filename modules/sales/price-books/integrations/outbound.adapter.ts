export const priceBooksOutboundAdapter = {
  name: "sales/price-books.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/price-books",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
