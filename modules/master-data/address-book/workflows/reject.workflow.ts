export const addressBookRejectWorkflow = {
  module: "master-data/address-book",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/address-book record ${recordId}`;
  },
};
