export const checkoutCloseWorkflow = {
  module: "commerce/checkout",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/checkout record ${recordId}`;
  },
};
