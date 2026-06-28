export const scrapReworkSubmitWorkflow = {
  module: "manufacturing/scrap-rework",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/scrap-rework record ${recordId}`;
  },
};
