export const shopFloorCloseWorkflow = {
  module: "manufacturing/shop-floor",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/shop-floor record ${recordId}`;
  },
};
