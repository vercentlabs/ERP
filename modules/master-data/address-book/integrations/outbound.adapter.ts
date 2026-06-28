export const addressBookOutboundAdapter = {
  name: "master-data/address-book.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/address-book",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
