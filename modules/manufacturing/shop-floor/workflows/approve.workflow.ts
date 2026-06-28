export const shopFloorApproveWorkflow = {
  module: "manufacturing/shop-floor",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/shop-floor record ${recordId}`;
  },
};
