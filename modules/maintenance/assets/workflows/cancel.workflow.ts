export const assetsCancelWorkflow = {
  module: "maintenance/assets",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for maintenance/assets record ${recordId}`;
  },
};
