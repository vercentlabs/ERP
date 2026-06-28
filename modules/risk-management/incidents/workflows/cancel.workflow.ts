export const incidentsCancelWorkflow = {
  module: "risk-management/incidents",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for risk-management/incidents record ${recordId}`;
  },
};
