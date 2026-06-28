export const fiscalYearsOutboundAdapter = {
  name: "finance/fiscal-years.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/fiscal-years",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
