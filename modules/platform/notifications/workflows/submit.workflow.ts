export const notificationsSubmitWorkflow = {
  module: "platform/notifications",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/notifications record ${recordId}`;
  },
};
