export const assetPerformanceApproveWorkflow = {
  module: "maintenance/asset-performance",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for maintenance/asset-performance record ${recordId}`;
  },
};
