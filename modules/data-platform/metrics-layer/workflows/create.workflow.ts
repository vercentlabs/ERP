export const metricsLayerCreateWorkflow = {
  module: "data-platform/metrics-layer",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for data-platform/metrics-layer record ${recordId}`;
  },
};
