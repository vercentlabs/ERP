export const mitigationsSubmitWorkflow = {
  module: "risk-management/mitigations",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for risk-management/mitigations record ${recordId}`;
  },
};
