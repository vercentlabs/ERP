export const cartsCancelWorkflow = {
  module: "commerce/carts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/carts record ${recordId}`;
  },
};
