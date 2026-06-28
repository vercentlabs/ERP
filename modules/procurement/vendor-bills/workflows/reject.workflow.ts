export const vendorBillsRejectWorkflow = {
  module: "procurement/vendor-bills",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/vendor-bills record ${recordId}`;
  },
};
