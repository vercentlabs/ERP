export const metricsLayerSubmitWorkflow = {
  module: "data-platform/metrics-layer",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for data-platform/metrics-layer record ${recordId}`;
  },
};
