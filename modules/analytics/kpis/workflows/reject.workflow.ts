export const kpisRejectWorkflow = {
  module: "analytics/kpis",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for analytics/kpis record ${recordId}`;
  },
};
