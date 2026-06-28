export const assetPerformanceCloseWorkflow = {
  module: "maintenance/asset-performance",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for maintenance/asset-performance record ${recordId}`;
  },
};
