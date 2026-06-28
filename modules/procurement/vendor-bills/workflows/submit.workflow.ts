export const vendorBillsSubmitWorkflow = {
  module: "procurement/vendor-bills",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/vendor-bills record ${recordId}`;
  },
};
