export const customerAssetsCloseWorkflow = {
  module: "field-service/customer-assets",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for field-service/customer-assets record ${recordId}`;
  },
};
