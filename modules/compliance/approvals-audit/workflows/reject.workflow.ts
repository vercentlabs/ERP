export const approvalsAuditRejectWorkflow = {
  module: "compliance/approvals-audit",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for compliance/approvals-audit record ${recordId}`;
  },
};
