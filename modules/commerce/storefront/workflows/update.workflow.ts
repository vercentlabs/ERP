export const storefrontUpdateWorkflow = {
  module: "commerce/storefront",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/storefront record ${recordId}`;
  },
};
