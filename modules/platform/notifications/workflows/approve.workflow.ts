export const notificationsApproveWorkflow = {
  module: "platform/notifications",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/notifications record ${recordId}`;
  },
};
