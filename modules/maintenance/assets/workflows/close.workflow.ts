export const assetsCloseWorkflow = {
  module: "maintenance/assets",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for maintenance/assets record ${recordId}`;
  },
};
