export const controlsCancelWorkflow = {
  module: "compliance/controls",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for compliance/controls record ${recordId}`;
  },
};
