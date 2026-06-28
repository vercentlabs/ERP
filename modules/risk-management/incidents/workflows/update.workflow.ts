export const incidentsUpdateWorkflow = {
  module: "risk-management/incidents",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for risk-management/incidents record ${recordId}`;
  },
};
