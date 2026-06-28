export const incidentsCreateWorkflow = {
  module: "risk-management/incidents",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for risk-management/incidents record ${recordId}`;
  },
};
