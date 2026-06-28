export const payrollPeriodsInboundAdapter = {
  name: "payroll/payroll-periods.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/payroll-periods",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
