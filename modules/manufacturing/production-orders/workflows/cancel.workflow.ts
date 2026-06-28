export const productionOrdersCancelWorkflow = {
  module: "manufacturing/production-orders",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/production-orders record ${recordId}`;
  },
};
