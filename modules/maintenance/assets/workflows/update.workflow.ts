export const assetsUpdateWorkflow = {
  module: "maintenance/assets",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for maintenance/assets record ${recordId}`;
  },
};
