export const vendorBillsCreateWorkflow = {
  module: "procurement/vendor-bills",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/vendor-bills record ${recordId}`;
  },
};
