export const metricsLayerUpdateWorkflow = {
  module: "data-platform/metrics-layer",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for data-platform/metrics-layer record ${recordId}`;
  },
};
