export const shopFloorUpdateWorkflow = {
  module: "manufacturing/shop-floor",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/shop-floor record ${recordId}`;
  },
};
