export const productionOrdersRejectWorkflow = {
  module: "manufacturing/production-orders",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/production-orders record ${recordId}`;
  },
};
