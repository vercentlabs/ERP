export const manufacturingAnalyticsCreateWorkflow = {
  module: "manufacturing/manufacturing-analytics",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for manufacturing/manufacturing-analytics record ${recordId}`;
  },
};
