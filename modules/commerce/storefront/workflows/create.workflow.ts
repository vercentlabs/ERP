export const storefrontCreateWorkflow = {
  module: "commerce/storefront",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for commerce/storefront record ${recordId}`;
  },
};
