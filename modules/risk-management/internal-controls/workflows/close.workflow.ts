export const internalControlsCloseWorkflow = {
  module: "risk-management/internal-controls",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for risk-management/internal-controls record ${recordId}`;
  },
};
