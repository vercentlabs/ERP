export const riskAssessmentsOutboundAdapter = {
  name: "risk-management/risk-assessments.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/risk-assessments",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
