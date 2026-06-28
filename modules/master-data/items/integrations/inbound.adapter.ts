export const itemsInboundAdapter = {
  name: "master-data/items.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "master-data/items",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
