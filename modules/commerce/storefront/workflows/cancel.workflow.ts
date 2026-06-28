export const storefrontCancelWorkflow = {
  module: "commerce/storefront",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/storefront record ${recordId}`;
  },
};
