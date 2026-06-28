export const addressBookCloseWorkflow = {
  module: "master-data/address-book",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/address-book record ${recordId}`;
  },
};
