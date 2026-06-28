export const internalControlsUpdateWorkflow = {
  module: "risk-management/internal-controls",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for risk-management/internal-controls record ${recordId}`;
  },
};
