export const kpisUpdateWorkflow = {
  module: "analytics/kpis",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for analytics/kpis record ${recordId}`;
  },
};
