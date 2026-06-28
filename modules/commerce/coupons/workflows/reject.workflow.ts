export const couponsRejectWorkflow = {
  module: "commerce/coupons",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/coupons record ${recordId}`;
  },
};
