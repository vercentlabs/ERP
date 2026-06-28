export const promotionsRejectWorkflow = {
  module: "commerce/promotions",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/promotions record ${recordId}`;
  },
};
