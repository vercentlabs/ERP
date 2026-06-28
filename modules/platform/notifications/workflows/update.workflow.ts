export const notificationsUpdateWorkflow = {
  module: "platform/notifications",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/notifications record ${recordId}`;
  },
};
