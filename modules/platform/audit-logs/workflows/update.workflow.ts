export const auditLogsUpdateWorkflow = {
  module: "platform/audit-logs",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/audit-logs record ${recordId}`;
  },
};
