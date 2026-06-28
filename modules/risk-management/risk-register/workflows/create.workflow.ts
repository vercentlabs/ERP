export const riskRegisterCreateWorkflow = {
  module: "risk-management/risk-register",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for risk-management/risk-register record ${recordId}`;
  },
};
