export const authCancelWorkflow = {
  module: "platform/auth",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/auth record ${recordId}`;
  },
};
