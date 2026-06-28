export const productionOrdersCreateWorkflow = {
  module: "manufacturing/production-orders",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/production-orders record ${recordId}`;
  },
};
