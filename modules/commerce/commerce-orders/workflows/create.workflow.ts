export const commerceOrdersCreateWorkflow = {
  module: "commerce/commerce-orders",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for commerce/commerce-orders record ${recordId}`;
  },
};
