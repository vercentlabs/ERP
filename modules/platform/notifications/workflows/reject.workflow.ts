export const notificationsRejectWorkflow = {
  module: "platform/notifications",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/notifications record ${recordId}`;
  },
};
