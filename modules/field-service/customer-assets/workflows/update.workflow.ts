export const customerAssetsUpdateWorkflow = {
  module: "field-service/customer-assets",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for field-service/customer-assets record ${recordId}`;
  },
};
