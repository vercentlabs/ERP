export const vendorBillsCancelWorkflow = {
  module: "procurement/vendor-bills",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/vendor-bills record ${recordId}`;
  },
};
