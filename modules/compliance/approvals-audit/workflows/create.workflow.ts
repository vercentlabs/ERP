export const approvalsAuditCreateWorkflow = {
  module: "compliance/approvals-audit",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for compliance/approvals-audit record ${recordId}`;
  },
};
