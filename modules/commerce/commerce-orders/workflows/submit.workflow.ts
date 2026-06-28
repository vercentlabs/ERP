export const commerceOrdersSubmitWorkflow = {
  module: "commerce/commerce-orders",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/commerce-orders record ${recordId}`;
  },
};
