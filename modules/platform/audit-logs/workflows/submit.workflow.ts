export const auditLogsSubmitWorkflow = {
  module: "platform/audit-logs",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/audit-logs record ${recordId}`;
  },
};
