export const shopFloorRejectWorkflow = {
  module: "manufacturing/shop-floor",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/shop-floor record ${recordId}`;
  },
};
