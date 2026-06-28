export const manufacturingAnalyticsCloseWorkflow = {
  module: "manufacturing/manufacturing-analytics",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for manufacturing/manufacturing-analytics record ${recordId}`;
  },
};
