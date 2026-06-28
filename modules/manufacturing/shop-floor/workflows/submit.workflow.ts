export const shopFloorSubmitWorkflow = {
  module: "manufacturing/shop-floor",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/shop-floor record ${recordId}`;
  },
};
