export const semanticLayerUpdateWorkflow = {
  module: "data-platform/semantic-layer",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for data-platform/semantic-layer record ${recordId}`;
  },
};
