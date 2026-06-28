export const payrollPeriodsOutboundAdapter = {
  name: "payroll/payroll-periods.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/payroll-periods",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
