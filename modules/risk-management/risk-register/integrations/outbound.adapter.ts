export const riskRegisterOutboundAdapter = {
  name: "risk-management/risk-register.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/risk-register",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
