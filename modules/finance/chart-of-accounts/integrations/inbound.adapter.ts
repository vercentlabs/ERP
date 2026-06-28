export const chartOfAccountsInboundAdapter = {
  name: "finance/chart-of-accounts.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/chart-of-accounts",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
