export const branchesCancelWorkflow = {
  module: "platform/branches",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/branches record ${recordId}`;
  },
};
