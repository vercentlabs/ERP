export const commerceOrdersUpdateWorkflow = {
  module: "commerce/commerce-orders",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/commerce-orders record ${recordId}`;
  },
};
