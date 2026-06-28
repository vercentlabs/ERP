export const manufacturingAnalyticsUpdateWorkflow = {
  module: "manufacturing/manufacturing-analytics",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for manufacturing/manufacturing-analytics record ${recordId}`;
  },
};
