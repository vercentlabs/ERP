export const dataWarehouseOutboundAdapter = {
  name: "data-platform/data-warehouse.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/data-warehouse",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
