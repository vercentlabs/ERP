export const promotionsCloseWorkflow = {
  module: "commerce/promotions",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/promotions record ${recordId}`;
  },
};
