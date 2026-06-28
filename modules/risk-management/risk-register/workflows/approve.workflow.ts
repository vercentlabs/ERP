export const riskRegisterApproveWorkflow = {
  module: "risk-management/risk-register",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for risk-management/risk-register record ${recordId}`;
  },
};
