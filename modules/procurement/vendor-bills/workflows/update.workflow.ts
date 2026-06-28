export const vendorBillsUpdateWorkflow = {
  module: "procurement/vendor-bills",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/vendor-bills record ${recordId}`;
  },
};
