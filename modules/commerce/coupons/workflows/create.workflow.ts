export const couponsCreateWorkflow = {
  module: "commerce/coupons",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for commerce/coupons record ${recordId}`;
  },
};
