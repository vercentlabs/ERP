export const mitigationsApproveWorkflow = {
  module: "risk-management/mitigations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for risk-management/mitigations record ${recordId}`;
  },
};
