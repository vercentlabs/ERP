export const auditLogsCancelWorkflow = {
  module: "platform/audit-logs",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/audit-logs record ${recordId}`;
  },
};
