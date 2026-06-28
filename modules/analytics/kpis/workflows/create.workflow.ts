export const kpisCreateWorkflow = {
  module: "analytics/kpis",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for analytics/kpis record ${recordId}`;
  },
};
