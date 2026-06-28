export const wavesApproveWorkflow = {
  module: "warehouse/waves",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for warehouse/waves record ${recordId}`;
  },
};
