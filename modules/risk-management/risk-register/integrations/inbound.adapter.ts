export const riskRegisterInboundAdapter = {
  name: "risk-management/risk-register.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/risk-register",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
