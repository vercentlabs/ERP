export const supplierScorecardsOutboundAdapter = {
  name: "procurement/supplier-scorecards.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/supplier-scorecards",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
