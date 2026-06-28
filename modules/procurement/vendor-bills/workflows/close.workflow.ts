export const vendorBillsCloseWorkflow = {
  module: "procurement/vendor-bills",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/vendor-bills record ${recordId}`;
  },
};
