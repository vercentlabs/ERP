export const manufacturingAnalyticsSubmitWorkflow = {
  module: "manufacturing/manufacturing-analytics",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for manufacturing/manufacturing-analytics record ${recordId}`;
  },
};
