export const promotionsCancelWorkflow = {
  module: "commerce/promotions",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/promotions record ${recordId}`;
  },
};
