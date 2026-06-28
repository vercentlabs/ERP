export const productionOrdersApproveWorkflow = {
  module: "manufacturing/production-orders",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/production-orders record ${recordId}`;
  },
};
