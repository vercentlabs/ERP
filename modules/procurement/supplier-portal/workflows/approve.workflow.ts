export const supplierPortalApproveWorkflow = {
  module: "procurement/supplier-portal",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/supplier-portal record ${recordId}`;
  },
};
