export const riskAssessmentsRejectWorkflow = {
  module: "risk-management/risk-assessments",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for risk-management/risk-assessments record ${recordId}`;
  },
};
