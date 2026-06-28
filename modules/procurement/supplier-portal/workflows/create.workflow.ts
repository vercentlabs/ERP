export const supplierPortalCreateWorkflow = {
  module: "procurement/supplier-portal",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/supplier-portal record ${recordId}`;
  },
};
