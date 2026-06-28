export const incidentsSubmitWorkflow = {
  module: "risk-management/incidents",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for risk-management/incidents record ${recordId}`;
  },
};
