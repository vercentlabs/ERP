export const shopFloorCancelWorkflow = {
  module: "manufacturing/shop-floor",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/shop-floor record ${recordId}`;
  },
};
