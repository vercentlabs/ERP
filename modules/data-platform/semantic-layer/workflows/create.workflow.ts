export const semanticLayerCreateWorkflow = {
  module: "data-platform/semantic-layer",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for data-platform/semantic-layer record ${recordId}`;
  },
};
