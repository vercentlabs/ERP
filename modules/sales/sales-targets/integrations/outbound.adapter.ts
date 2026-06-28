export const salesTargetsOutboundAdapter = {
  name: "sales/sales-targets.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/sales-targets",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
