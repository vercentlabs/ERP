export const internalControlsCreateWorkflow = {
  module: "risk-management/internal-controls",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for risk-management/internal-controls record ${recordId}`;
  },
};
