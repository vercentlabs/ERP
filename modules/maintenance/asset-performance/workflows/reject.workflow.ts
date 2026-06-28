export const assetPerformanceRejectWorkflow = {
  module: "maintenance/asset-performance",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for maintenance/asset-performance record ${recordId}`;
  },
};
