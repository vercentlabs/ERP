export const supplierPortalCancelWorkflow = {
  module: "procurement/supplier-portal",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/supplier-portal record ${recordId}`;
  },
};
