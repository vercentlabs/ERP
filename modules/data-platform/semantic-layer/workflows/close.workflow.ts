export const semanticLayerCloseWorkflow = {
  module: "data-platform/semantic-layer",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for data-platform/semantic-layer record ${recordId}`;
  },
};
