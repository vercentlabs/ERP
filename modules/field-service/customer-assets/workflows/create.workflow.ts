export const customerAssetsCreateWorkflow = {
  module: "field-service/customer-assets",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for field-service/customer-assets record ${recordId}`;
  },
};
