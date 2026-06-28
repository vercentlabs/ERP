export const productionOrdersCloseWorkflow = {
  module: "manufacturing/production-orders",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/production-orders record ${recordId}`;
  },
};
