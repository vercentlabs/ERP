export const engineeringChangeOrdersRejectWorkflow = {
  module: "product-lifecycle/engineering-change-orders",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for product-lifecycle/engineering-change-orders record ${recordId}`;
  },
};
