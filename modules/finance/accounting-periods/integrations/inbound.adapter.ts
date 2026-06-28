export const accountingPeriodsInboundAdapter = {
  name: "finance/accounting-periods.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/accounting-periods",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
