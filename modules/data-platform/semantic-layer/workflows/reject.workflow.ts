export const semanticLayerRejectWorkflow = {
  module: "data-platform/semantic-layer",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for data-platform/semantic-layer record ${recordId}`;
  },
};
