export const manufacturingAnalyticsCancelWorkflow = {
  module: "manufacturing/manufacturing-analytics",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for manufacturing/manufacturing-analytics record ${recordId}`;
  },
};
