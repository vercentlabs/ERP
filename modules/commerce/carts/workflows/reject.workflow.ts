export const cartsRejectWorkflow = {
  module: "commerce/carts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/carts record ${recordId}`;
  },
};
