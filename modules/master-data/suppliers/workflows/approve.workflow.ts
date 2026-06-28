export const suppliersApproveWorkflow = {
  module: "master-data/suppliers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/suppliers record ${recordId}`;
  },
};
