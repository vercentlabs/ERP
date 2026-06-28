export const supplierScorecardsInboundAdapter = {
  name: "procurement/supplier-scorecards.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/supplier-scorecards",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
