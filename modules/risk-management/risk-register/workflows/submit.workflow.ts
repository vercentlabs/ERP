export const riskRegisterSubmitWorkflow = {
  module: "risk-management/risk-register",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for risk-management/risk-register record ${recordId}`;
  },
};
