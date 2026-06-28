export const promotionsApproveWorkflow = {
  module: "commerce/promotions",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/promotions record ${recordId}`;
  },
};
