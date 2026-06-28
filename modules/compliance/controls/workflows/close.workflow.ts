export const controlsCloseWorkflow = {
  module: "compliance/controls",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for compliance/controls record ${recordId}`;
  },
};
