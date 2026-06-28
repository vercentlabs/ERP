export const supplierPortalCloseWorkflow = {
  module: "procurement/supplier-portal",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/supplier-portal record ${recordId}`;
  },
};
