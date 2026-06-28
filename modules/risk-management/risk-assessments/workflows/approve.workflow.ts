export const riskAssessmentsApproveWorkflow = {
  module: "risk-management/risk-assessments",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for risk-management/risk-assessments record ${recordId}`;
  },
};
