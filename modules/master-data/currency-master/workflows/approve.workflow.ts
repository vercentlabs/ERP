export const currencyMasterApproveWorkflow = {
  module: "master-data/currency-master",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/currency-master record ${recordId}`;
  },
};
