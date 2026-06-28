export const commerceOrdersRejectWorkflow = {
  module: "commerce/commerce-orders",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/commerce-orders record ${recordId}`;
  },
};
