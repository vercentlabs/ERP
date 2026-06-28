export const customerAssetsCancelWorkflow = {
  module: "field-service/customer-assets",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for field-service/customer-assets record ${recordId}`;
  },
};
