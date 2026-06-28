export const productionOrdersUpdateWorkflow = {
  module: "manufacturing/production-orders",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/production-orders record ${recordId}`;
  },
};
