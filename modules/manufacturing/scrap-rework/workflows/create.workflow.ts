export const scrapReworkCreateWorkflow = {
  module: "manufacturing/scrap-rework",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/scrap-rework record ${recordId}`;
  },
};
