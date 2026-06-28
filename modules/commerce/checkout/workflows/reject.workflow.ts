export const checkoutRejectWorkflow = {
  module: "commerce/checkout",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/checkout record ${recordId}`;
  },
};
