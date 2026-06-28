export const taxDeclarationsInboundAdapter = {
  name: "payroll/tax-declarations.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/tax-declarations",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
