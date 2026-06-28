export const suppliersCancelWorkflow = {
  module: "procurement/suppliers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/suppliers record ${recordId}`;
  },
};
