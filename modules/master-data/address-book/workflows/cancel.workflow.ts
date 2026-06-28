export const addressBookCancelWorkflow = {
  module: "master-data/address-book",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/address-book record ${recordId}`;
  },
};
