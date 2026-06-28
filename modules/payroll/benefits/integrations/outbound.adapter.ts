export const benefitsOutboundAdapter = {
  name: "payroll/benefits.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/benefits",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
