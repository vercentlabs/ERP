export const internalControlsCancelWorkflow = {
  module: "risk-management/internal-controls",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for risk-management/internal-controls record ${recordId}`;
  },
};
