export const checkoutUpdateWorkflow = {
  module: "commerce/checkout",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/checkout record ${recordId}`;
  },
};
