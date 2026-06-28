export const productRevisionsCancelWorkflow = {
  module: "product-lifecycle/product-revisions",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for product-lifecycle/product-revisions record ${recordId}`;
  },
};
