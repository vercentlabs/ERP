export const budgetingOutboundAdapter = {
  name: "enterprise-performance/budgeting.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/budgeting",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
