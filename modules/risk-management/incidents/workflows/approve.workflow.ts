export const incidentsApproveWorkflow = {
  module: "risk-management/incidents",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for risk-management/incidents record ${recordId}`;
  },
};
