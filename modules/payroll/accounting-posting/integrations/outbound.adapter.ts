export const accountingPostingOutboundAdapter = {
  name: "payroll/accounting-posting.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/accounting-posting",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
