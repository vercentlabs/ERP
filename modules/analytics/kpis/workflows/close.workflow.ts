export const kpisCloseWorkflow = {
  module: "analytics/kpis",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for analytics/kpis record ${recordId}`;
  },
};
