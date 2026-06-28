export const kpisApproveWorkflow = {
  module: "analytics/kpis",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for analytics/kpis record ${recordId}`;
  },
};
