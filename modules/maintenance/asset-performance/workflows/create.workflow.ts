export const assetPerformanceCreateWorkflow = {
  module: "maintenance/asset-performance",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for maintenance/asset-performance record ${recordId}`;
  },
};
