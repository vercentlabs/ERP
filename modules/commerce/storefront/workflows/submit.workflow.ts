export const storefrontSubmitWorkflow = {
  module: "commerce/storefront",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/storefront record ${recordId}`;
  },
};
