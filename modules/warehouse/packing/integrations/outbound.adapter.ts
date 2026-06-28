export const packingOutboundAdapter = {
  name: "warehouse/packing.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/packing",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
