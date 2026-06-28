export const incidentsCloseWorkflow = {
  module: "risk-management/incidents",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for risk-management/incidents record ${recordId}`;
  },
};
