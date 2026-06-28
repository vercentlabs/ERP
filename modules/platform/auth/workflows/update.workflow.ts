export const authUpdateWorkflow = {
  module: "platform/auth",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/auth record ${recordId}`;
  },
};
