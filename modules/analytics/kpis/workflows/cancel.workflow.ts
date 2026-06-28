export const kpisCancelWorkflow = {
  module: "analytics/kpis",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for analytics/kpis record ${recordId}`;
  },
};
