export const warehousesOutboundAdapter = {
  name: "inventory/warehouses.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/warehouses",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
