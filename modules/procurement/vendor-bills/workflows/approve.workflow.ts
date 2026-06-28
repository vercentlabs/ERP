export const vendorBillsApproveWorkflow = {
  module: "procurement/vendor-bills",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/vendor-bills record ${recordId}`;
  },
};
