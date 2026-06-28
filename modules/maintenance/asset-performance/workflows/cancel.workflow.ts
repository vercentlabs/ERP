export const assetPerformanceCancelWorkflow = {
  module: "maintenance/asset-performance",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for maintenance/asset-performance record ${recordId}`;
  },
};
