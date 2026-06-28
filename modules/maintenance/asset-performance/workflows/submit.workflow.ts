export const assetPerformanceSubmitWorkflow = {
  module: "maintenance/asset-performance",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for maintenance/asset-performance record ${recordId}`;
  },
};
