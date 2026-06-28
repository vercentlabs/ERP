export const cartsUpdateWorkflow = {
  module: "commerce/carts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/carts record ${recordId}`;
  },
};
