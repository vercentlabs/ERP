export const controlsUpdateWorkflow = {
  module: "compliance/controls",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for compliance/controls record ${recordId}`;
  },
};
