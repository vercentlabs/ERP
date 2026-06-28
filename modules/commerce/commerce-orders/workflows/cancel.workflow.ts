export const commerceOrdersCancelWorkflow = {
  module: "commerce/commerce-orders",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/commerce-orders record ${recordId}`;
  },
};
