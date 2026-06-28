export const mitigationsRejectWorkflow = {
  module: "risk-management/mitigations",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for risk-management/mitigations record ${recordId}`;
  },
};
