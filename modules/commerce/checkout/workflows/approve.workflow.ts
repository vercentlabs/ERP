export const checkoutApproveWorkflow = {
  module: "commerce/checkout",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/checkout record ${recordId}`;
  },
};
