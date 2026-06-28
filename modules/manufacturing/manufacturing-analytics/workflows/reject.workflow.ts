export const manufacturingAnalyticsRejectWorkflow = {
  module: "manufacturing/manufacturing-analytics",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for manufacturing/manufacturing-analytics record ${recordId}`;
  },
};
