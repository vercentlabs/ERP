export const manufacturingAnalyticsApproveWorkflow = {
  module: "manufacturing/manufacturing-analytics",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for manufacturing/manufacturing-analytics record ${recordId}`;
  },
};
