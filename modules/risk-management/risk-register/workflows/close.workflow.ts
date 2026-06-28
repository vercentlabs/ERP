export const riskRegisterCloseWorkflow = {
  module: "risk-management/risk-register",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for risk-management/risk-register record ${recordId}`;
  },
};
