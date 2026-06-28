export const commerceOrdersApproveWorkflow = {
  module: "commerce/commerce-orders",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/commerce-orders record ${recordId}`;
  },
};
