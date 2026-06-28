export const promotionsUpdateWorkflow = {
  module: "commerce/promotions",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/promotions record ${recordId}`;
  },
};
