export const scrapReworkRejectWorkflow = {
  module: "manufacturing/scrap-rework",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/scrap-rework record ${recordId}`;
  },
};
