export const scrapReworkUpdateWorkflow = {
  module: "manufacturing/scrap-rework",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/scrap-rework record ${recordId}`;
  },
};
