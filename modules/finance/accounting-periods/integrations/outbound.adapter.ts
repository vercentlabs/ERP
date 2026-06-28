export const accountingPeriodsOutboundAdapter = {
  name: "finance/accounting-periods.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/accounting-periods",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
