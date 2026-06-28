export const riskAssessmentsSubmitWorkflow = {
  module: "risk-management/risk-assessments",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for risk-management/risk-assessments record ${recordId}`;
  },
};
