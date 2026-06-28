export const riskAssessmentsCancelWorkflow = {
  module: "risk-management/risk-assessments",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for risk-management/risk-assessments record ${recordId}`;
  },
};
