export const mitigationsCancelWorkflow = {
  module: "risk-management/mitigations",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for risk-management/mitigations record ${recordId}`;
  },
};
