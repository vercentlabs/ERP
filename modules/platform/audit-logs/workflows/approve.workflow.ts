export const auditLogsApproveWorkflow = {
  module: "platform/audit-logs",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/audit-logs record ${recordId}`;
  },
};
