export const assetsCreateWorkflow = {
  module: "maintenance/assets",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for maintenance/assets record ${recordId}`;
  },
};
