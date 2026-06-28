export const storefrontRejectWorkflow = {
  module: "commerce/storefront",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/storefront record ${recordId}`;
  },
};
