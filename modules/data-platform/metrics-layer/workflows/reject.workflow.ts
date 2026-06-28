export const metricsLayerRejectWorkflow = {
  module: "data-platform/metrics-layer",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for data-platform/metrics-layer record ${recordId}`;
  },
};
