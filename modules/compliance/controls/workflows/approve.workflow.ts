export const controlsApproveWorkflow = {
  module: "compliance/controls",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for compliance/controls record ${recordId}`;
  },
};
