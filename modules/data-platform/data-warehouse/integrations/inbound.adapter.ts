export const dataWarehouseInboundAdapter = {
  name: "data-platform/data-warehouse.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/data-warehouse",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
