export const semanticLayerApproveWorkflow = {
  module: "data-platform/semantic-layer",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for data-platform/semantic-layer record ${recordId}`;
  },
};
