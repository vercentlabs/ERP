export const riskAssessmentsInboundAdapter = {
  name: "risk-management/risk-assessments.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/risk-assessments",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
