export const storefrontCloseWorkflow = {
  module: "commerce/storefront",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/storefront record ${recordId}`;
  },
};
