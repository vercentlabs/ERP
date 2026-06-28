export const chartOfAccountsOutboundAdapter = {
  name: "finance/chart-of-accounts.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/chart-of-accounts",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
