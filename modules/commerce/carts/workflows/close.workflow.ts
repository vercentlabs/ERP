export const cartsCloseWorkflow = {
  module: "commerce/carts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/carts record ${recordId}`;
  },
};
