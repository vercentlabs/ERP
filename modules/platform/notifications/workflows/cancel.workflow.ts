export const notificationsCancelWorkflow = {
  module: "platform/notifications",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/notifications record ${recordId}`;
  },
};
