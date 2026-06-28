export const taxMasterApproveWorkflow = {
  module: "master-data/tax-master",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/tax-master record ${recordId}`;
  },
};
