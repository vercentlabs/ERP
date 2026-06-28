export const semanticLayerSubmitWorkflow = {
  module: "data-platform/semantic-layer",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for data-platform/semantic-layer record ${recordId}`;
  },
};
