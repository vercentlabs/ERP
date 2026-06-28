export const addressBookApproveWorkflow = {
  module: "master-data/address-book",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/address-book record ${recordId}`;
  },
};
