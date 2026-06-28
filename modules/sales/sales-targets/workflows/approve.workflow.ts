export const salesTargetsApproveWorkflow = {
  module: "sales/sales-targets",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/sales-targets record ${recordId}`;
  },
};
