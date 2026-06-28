export const couponsUpdateWorkflow = {
  module: "commerce/coupons",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/coupons record ${recordId}`;
  },
};
