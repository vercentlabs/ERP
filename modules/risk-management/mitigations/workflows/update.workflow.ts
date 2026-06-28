export const mitigationsUpdateWorkflow = {
  module: "risk-management/mitigations",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for risk-management/mitigations record ${recordId}`;
  },
};
