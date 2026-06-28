export const approvalsAuditUpdateWorkflow = {
  module: "compliance/approvals-audit",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for compliance/approvals-audit record ${recordId}`;
  },
};
