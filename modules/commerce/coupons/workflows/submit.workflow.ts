export const couponsSubmitWorkflow = {
  module: "commerce/coupons",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/coupons record ${recordId}`;
  },
};
