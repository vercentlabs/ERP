export const addressBookCreateWorkflow = {
  module: "master-data/address-book",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/address-book record ${recordId}`;
  },
};
