export const accountingPostingInboundAdapter = {
  name: "payroll/accounting-posting.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/accounting-posting",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
