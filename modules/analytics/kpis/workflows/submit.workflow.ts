export const kpisSubmitWorkflow = {
  module: "analytics/kpis",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for analytics/kpis record ${recordId}`;
  },
};
