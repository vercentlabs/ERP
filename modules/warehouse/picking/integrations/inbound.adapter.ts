export const pickingInboundAdapter = {
  name: "warehouse/picking.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/picking",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
