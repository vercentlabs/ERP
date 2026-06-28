export const notificationsCreateWorkflow = {
  module: "platform/notifications",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/notifications record ${recordId}`;
  },
};
