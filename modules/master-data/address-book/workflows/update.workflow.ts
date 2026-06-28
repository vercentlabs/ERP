export const addressBookUpdateWorkflow = {
  module: "master-data/address-book",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/address-book record ${recordId}`;
  },
};
