export const productRevisionsSubmitWorkflow = {
  module: "product-lifecycle/product-revisions",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for product-lifecycle/product-revisions record ${recordId}`;
  },
};
