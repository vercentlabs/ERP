export const notificationsCloseWorkflow = {
  module: "platform/notifications",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/notifications record ${recordId}`;
  },
};
