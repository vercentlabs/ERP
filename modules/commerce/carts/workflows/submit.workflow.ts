export const cartsSubmitWorkflow = {
  module: "commerce/carts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/carts record ${recordId}`;
  },
};
