export const metricsLayerCancelWorkflow = {
  module: "data-platform/metrics-layer",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for data-platform/metrics-layer record ${recordId}`;
  },
};
