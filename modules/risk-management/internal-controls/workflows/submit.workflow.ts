export const internalControlsSubmitWorkflow = {
  module: "risk-management/internal-controls",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for risk-management/internal-controls record ${recordId}`;
  },
};
