export const auditLogsRejectWorkflow = {
  module: "platform/audit-logs",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/audit-logs record ${recordId}`;
  },
};
