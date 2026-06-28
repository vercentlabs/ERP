export const assetPerformanceUpdateWorkflow = {
  module: "maintenance/asset-performance",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for maintenance/asset-performance record ${recordId}`;
  },
};
