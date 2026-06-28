export const authRejectWorkflow = {
  module: "platform/auth",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/auth record ${recordId}`;
  },
};
