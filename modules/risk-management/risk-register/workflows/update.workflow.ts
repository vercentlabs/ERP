export const riskRegisterUpdateWorkflow = {
  module: "risk-management/risk-register",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for risk-management/risk-register record ${recordId}`;
  },
};
