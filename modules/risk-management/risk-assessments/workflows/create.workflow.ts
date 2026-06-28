export const riskAssessmentsCreateWorkflow = {
  module: "risk-management/risk-assessments",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for risk-management/risk-assessments record ${recordId}`;
  },
};
