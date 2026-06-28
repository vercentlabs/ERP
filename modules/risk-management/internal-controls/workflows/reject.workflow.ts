export const internalControlsRejectWorkflow = {
  module: "risk-management/internal-controls",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for risk-management/internal-controls record ${recordId}`;
  },
};
