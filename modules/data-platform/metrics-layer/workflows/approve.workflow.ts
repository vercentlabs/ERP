export const metricsLayerApproveWorkflow = {
  module: "data-platform/metrics-layer",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for data-platform/metrics-layer record ${recordId}`;
  },
};
