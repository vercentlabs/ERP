export const blanketOrdersApproveWorkflow = {
  module: "procurement/blanket-orders",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/blanket-orders record ${recordId}`;
  },
};
