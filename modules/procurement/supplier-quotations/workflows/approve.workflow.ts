export const supplierQuotationsApproveWorkflow = {
  module: "procurement/supplier-quotations",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/supplier-quotations record ${recordId}`;
  },
};
