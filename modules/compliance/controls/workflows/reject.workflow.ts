export const controlsRejectWorkflow = {
  module: "compliance/controls",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for compliance/controls record ${recordId}`;
  },
};
