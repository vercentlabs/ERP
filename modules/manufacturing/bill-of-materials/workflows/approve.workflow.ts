export const billOfMaterialsApproveWorkflow = {
  module: "manufacturing/bill-of-materials",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/bill-of-materials record ${recordId}`;
  },
};
