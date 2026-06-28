export const scrapReworkApproveWorkflow = {
  module: "manufacturing/scrap-rework",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/scrap-rework record ${recordId}`;
  },
};
