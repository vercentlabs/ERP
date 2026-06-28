export const auditLogsCloseWorkflow = {
  module: "platform/audit-logs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/audit-logs record ${recordId}`;
  },
};
