export const checkoutCancelWorkflow = {
  module: "commerce/checkout",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/checkout record ${recordId}`;
  },
};
