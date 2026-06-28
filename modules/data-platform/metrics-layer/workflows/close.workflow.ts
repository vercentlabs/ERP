export const metricsLayerCloseWorkflow = {
  module: "data-platform/metrics-layer",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for data-platform/metrics-layer record ${recordId}`;
  },
};
