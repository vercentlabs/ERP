export const billOfMaterialsOutboundAdapter = {
  name: "manufacturing/bill-of-materials.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/bill-of-materials",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
