export const productionOrdersSubmitWorkflow = {
  module: "manufacturing/production-orders",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/production-orders record ${recordId}`;
  },
};
