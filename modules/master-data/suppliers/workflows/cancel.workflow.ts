export const suppliersCancelWorkflow = {
  module: "master-data/suppliers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/suppliers record ${recordId}`;
  },
};
