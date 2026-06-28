export const riskAssessmentsCloseWorkflow = {
  module: "risk-management/risk-assessments",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for risk-management/risk-assessments record ${recordId}`;
  },
};
