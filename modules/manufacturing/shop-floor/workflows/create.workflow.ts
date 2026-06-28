export const shopFloorCreateWorkflow = {
  module: "manufacturing/shop-floor",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/shop-floor record ${recordId}`;
  },
};
