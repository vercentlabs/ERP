export const suppliersApproveWorkflow = {
  module: "procurement/suppliers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/suppliers record ${recordId}`;
  },
};
