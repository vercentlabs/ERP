export const riskAssessmentsUpdateWorkflow = {
  module: "risk-management/risk-assessments",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for risk-management/risk-assessments record ${recordId}`;
  },
};
