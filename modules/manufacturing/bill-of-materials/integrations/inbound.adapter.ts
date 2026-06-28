export const billOfMaterialsInboundAdapter = {
  name: "manufacturing/bill-of-materials.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/bill-of-materials",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
