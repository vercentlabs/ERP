export const promotionsCreateWorkflow = {
  module: "commerce/promotions",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for commerce/promotions record ${recordId}`;
  },
};
