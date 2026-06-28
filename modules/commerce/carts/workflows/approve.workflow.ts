export const cartsApproveWorkflow = {
  module: "commerce/carts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/carts record ${recordId}`;
  },
};
