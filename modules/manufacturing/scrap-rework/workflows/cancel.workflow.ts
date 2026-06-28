export const scrapReworkCancelWorkflow = {
  module: "manufacturing/scrap-rework",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/scrap-rework record ${recordId}`;
  },
};
