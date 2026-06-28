export const supplierPortalUpdateWorkflow = {
  module: "procurement/supplier-portal",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/supplier-portal record ${recordId}`;
  },
};
