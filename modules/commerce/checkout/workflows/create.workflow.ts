export const checkoutCreateWorkflow = {
  module: "commerce/checkout",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for commerce/checkout record ${recordId}`;
  },
};
