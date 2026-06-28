export const couponsCloseWorkflow = {
  module: "commerce/coupons",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/coupons record ${recordId}`;
  },
};
