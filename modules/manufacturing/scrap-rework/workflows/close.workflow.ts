export const scrapReworkCloseWorkflow = {
  module: "manufacturing/scrap-rework",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/scrap-rework record ${recordId}`;
  },
};
