export const addressBookSubmitWorkflow = {
  module: "master-data/address-book",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/address-book record ${recordId}`;
  },
};
