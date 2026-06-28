export const riskRegisterCancelWorkflow = {
  module: "risk-management/risk-register",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for risk-management/risk-register record ${recordId}`;
  },
};
