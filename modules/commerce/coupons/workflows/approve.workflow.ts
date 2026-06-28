export const couponsApproveWorkflow = {
  module: "commerce/coupons",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/coupons record ${recordId}`;
  },
};
