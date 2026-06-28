export const authCreateWorkflow = {
  module: "platform/auth",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/auth record ${recordId}`;
  },
};
