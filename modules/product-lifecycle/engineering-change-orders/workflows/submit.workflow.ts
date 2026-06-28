export const engineeringChangeOrdersSubmitWorkflow = {
  module: "product-lifecycle/engineering-change-orders",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for product-lifecycle/engineering-change-orders record ${recordId}`;
  },
};
