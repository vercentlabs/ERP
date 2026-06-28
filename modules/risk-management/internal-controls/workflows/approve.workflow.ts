export const internalControlsApproveWorkflow = {
  module: "risk-management/internal-controls",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for risk-management/internal-controls record ${recordId}`;
  },
};
