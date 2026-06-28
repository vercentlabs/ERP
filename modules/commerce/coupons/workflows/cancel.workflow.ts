export const couponsCancelWorkflow = {
  module: "commerce/coupons",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/coupons record ${recordId}`;
  },
};
