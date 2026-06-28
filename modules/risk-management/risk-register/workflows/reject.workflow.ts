export const riskRegisterRejectWorkflow = {
  module: "risk-management/risk-register",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for risk-management/risk-register record ${recordId}`;
  },
};
