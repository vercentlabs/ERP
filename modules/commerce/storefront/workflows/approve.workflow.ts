export const storefrontApproveWorkflow = {
  module: "commerce/storefront",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/storefront record ${recordId}`;
  },
};
