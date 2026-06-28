export const payslipsInboundAdapter = {
  name: "payroll/payslips.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/payslips",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
