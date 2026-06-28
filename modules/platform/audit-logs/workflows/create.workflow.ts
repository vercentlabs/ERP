export const auditLogsCreateWorkflow = {
  module: "platform/audit-logs",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/audit-logs record ${recordId}`;
  },
};
