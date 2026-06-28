export const incidentsRejectWorkflow = {
  module: "risk-management/incidents",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for risk-management/incidents record ${recordId}`;
  },
};
