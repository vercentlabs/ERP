export const approvalsAuditApproveWorkflow = {
  module: "compliance/approvals-audit",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for compliance/approvals-audit record ${recordId}`;
  },
};
