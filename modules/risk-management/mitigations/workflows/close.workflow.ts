export const mitigationsCloseWorkflow = {
  module: "risk-management/mitigations",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for risk-management/mitigations record ${recordId}`;
  },
};
