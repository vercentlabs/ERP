export const semanticLayerCancelWorkflow = {
  module: "data-platform/semantic-layer",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for data-platform/semantic-layer record ${recordId}`;
  },
};
