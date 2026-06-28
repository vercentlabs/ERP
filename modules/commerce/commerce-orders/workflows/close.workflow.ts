export const commerceOrdersCloseWorkflow = {
  module: "commerce/commerce-orders",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/commerce-orders record ${recordId}`;
  },
};
